"use client"

import React, { useState } from "react"
import { HudContainer } from "./hud-container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Terminal, Copy, CheckCircle2 } from "lucide-react"
import { generateProjectSynopsis } from "@/ai/flows/ai-project-synopsis-generator"
import { useToast } from "@/hooks/use-toast"

export const AiSynopsisTool = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const data = await generateProjectSynopsis({
        projectName: formData.get("name") as string,
        projectDescription: formData.get("desc") as string,
        technologiesUsed: (formData.get("tech") as string).split(",").map(s => s.trim()),
        desiredTone: formData.get("tone") as string,
      })
      setResult(data.synopsis)
    } catch (err) {
      toast({
        title: "Connection Error",
        description: "Failed to establish link to AI Core. Check your uplink.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <HudContainer title="GEN_AI_SYNOPSIS_LAB" className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Project Name</label>
            <Input name="name" placeholder="e.g. Project Zero-Day" required className="bg-background/50 border-primary/30 font-code text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Stack (comma separated)</label>
            <Input name="tech" placeholder="e.g. React, Node, SQL" required className="bg-background/50 border-primary/30 font-code text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Desired Tone</label>
            <Select name="tone" defaultValue="professional">
              <SelectTrigger className="bg-background/50 border-primary/30 font-code text-sm">
                <SelectValue placeholder="Select Tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Full Description</label>
            <Textarea name="desc" placeholder="Paste detailed project context here..." required className="bg-background/50 border-primary/30 font-code text-sm min-h-[120px]" />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/80 font-headline">
            {loading ? <Terminal className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
            GENERATE_SYNOPSIS
          </Button>
        </form>

        <div className="flex flex-col h-full border border-dashed border-primary/20 rounded-lg p-4 bg-primary/5">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-[10px] font-code text-muted-foreground uppercase">Output Terminal</h5>
            {result && (
              <button onClick={copyToClipboard} className="text-primary hover:text-accent transition-colors">
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
          <div className="flex-1 font-code text-sm text-foreground overflow-y-auto">
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <span className="text-primary mr-2">{'>'}</span>
                {result}
              </div>
            ) : (
              <div className="text-muted-foreground/40 italic flex flex-col items-center justify-center h-full text-center">
                <Terminal className="w-8 h-8 mb-2 opacity-20" />
                Awaiting input data for compilation...
              </div>
            )}
          </div>
        </div>
      </div>
    </HudContainer>
  )
}