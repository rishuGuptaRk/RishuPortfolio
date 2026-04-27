
"use client"

import React, { useState } from "react"
import { HudContainer } from "./hud-container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Terminal, Copy, CheckCircle2, UserCheck } from "lucide-react"
import { generateAboutMeSection } from "@/ai/flows/ai-about-me-section-generator"
import { useToast } from "@/hooks/use-toast"

export const AiDossierLab = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    try {
      const data = await generateAboutMeSection({
        professionalDetails: formData.get("details") as string,
        desiredTone: formData.get("tone") as any,
      })
      setResult(data.aboutMeSection)
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
    <HudContainer title="DEDSEC_DOSSIER_LAB" className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Desired Tone</label>
            <Select name="tone" defaultValue="professional">
              <SelectTrigger className="bg-background/50 border-primary/30 font-code text-sm">
                <SelectValue placeholder="Select Tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="innovative">Innovative</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="witty">Witty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Professional Intel</label>
            <Textarea 
              name="details" 
              placeholder="List your skills, experience, and achievements..." 
              required 
              className="bg-background/50 border-primary/30 font-code text-sm min-h-[180px]" 
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/80 font-headline">
            {loading ? <Terminal className="w-4 h-4 animate-spin mr-2" /> : <UserCheck className="w-4 h-4 mr-2" />}
            GENERATE_DOSSIER
          </Button>
        </form>

        <div className="flex flex-col h-full border border-dashed border-primary/20 rounded-lg p-4 bg-primary/5">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-[10px] font-code text-muted-foreground uppercase">Output Dossier</h5>
            {result && (
              <button onClick={copyToClipboard} className="text-primary hover:text-accent transition-colors">
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
          <div className="flex-1 font-code text-sm text-foreground overflow-y-auto">
            {result ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 whitespace-pre-wrap">
                <span className="text-primary mr-2">{'>'}</span>
                {result}
              </div>
            ) : (
              <div className="text-muted-foreground/40 italic flex flex-col items-center justify-center h-full text-center p-6">
                <UserCheck className="w-8 h-8 mb-2 opacity-20" />
                Input your credentials to compile an operative dossier...
              </div>
            )}
          </div>
        </div>
      </div>
    </HudContainer>
  )
}
