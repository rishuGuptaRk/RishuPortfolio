
"use client"

import React, { useRef, useState } from "react"
import { HudContainer } from "./hud-container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Instagram, Send, Radio, Loader2 } from "lucide-react"
import emailjs from '@emailjs/browser'
import { useToast } from "@/hooks/use-toast"

export const ContactModule = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSending(true)

    const formData = new FormData(formRef.current)
    
    // Explicitly cast to strings to ensure EmailJS compatibility
    const templateParams = {
      from_name: String(formData.get('from_name')),
      reply_to: String(formData.get('reply_to')),
      subject: String(formData.get('subject')),
      message: String(formData.get('message')),
    }

    try {
      // Transmission using provided credentials
      const response = await emailjs.send(
        'service_parc3eb', 
        'template_129gio6', 
        templateParams, 
        'N45Ktmx8wtYtliECi'
      )

      if (response.status === 200) {
        toast({
          title: "TRANSMISSION_SUCCESS",
          description: "Your packet has been encrypted and sent to the operative.",
        })
        formRef.current.reset()
      } else {
        throw new Error('Non-200 response from EmailJS')
      }
    } catch (error) {
      console.error("Transmission Error:", error)
      toast({
        title: "TRANSMISSION_FAILURE",
        description: "System error during packet relay. Check your uplink.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <HudContainer title="ENCRYPTED_COMMS_CHANNEL" className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h4 className="text-2xl font-headline text-primary mb-4 uppercase">Contact_Operative</h4>
            <p className="text-muted-foreground font-body leading-relaxed">
              If you have projects that require a high degree of technical infiltration or a clean front-end finish, transmit your requirements through the secure form.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-code text-accent uppercase tracking-widest">Global Handlers</h5>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/rishuGuptaRk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-card border border-primary/20 hover:border-primary transition-all rounded group"
              >
                <Github className="w-5 h-5 text-primary group-hover:text-accent" />
                <span className="text-sm font-code">Github</span>
              </a>
              <a 
                href="http://linkedin.com/in/rishu-gupta-3b6b4b179/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-card border border-primary/20 hover:border-primary transition-all rounded group"
              >
                <Linkedin className="w-5 h-5 text-primary group-hover:text-accent" />
                <span className="text-sm font-code">LinkedIn</span>
              </a>
              <a 
                href="https://www.instagram.com/hey.rishu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-card border border-primary/20 hover:border-primary transition-all rounded group"
              >
                <Instagram className="w-5 h-5 text-primary group-hover:text-accent" />
                <span className="text-sm font-code">Instagram</span>
              </a>
            </div>
          </div>

          <div className="p-4 border-l-2 border-accent bg-accent/5 flex items-center gap-4">
            <Radio className="w-6 h-6 text-accent animate-pulse" />
            <div>
              <p className="text-[10px] font-code text-accent uppercase">Current Location</p>
              <p className="font-headline text-sm">SILIGURI_NODE_WB</p>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSendEmail} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-code text-primary uppercase">Alias</label>
              <Input name="from_name" placeholder="OPERATIVE NAME" required className="bg-background border-primary/30" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-code text-primary uppercase">Return Signal</label>
              <Input type="email" name="reply_to" placeholder="EMAIL ADDRESS" required className="bg-background border-primary/30" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Subject</label>
            <Input name="subject" placeholder="TRANSMISSION TOPIC" required className="bg-background border-primary/30" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Payload</label>
            <Textarea name="message" placeholder="ENTER YOUR MESSAGE..." required className="bg-background border-primary/30 min-h-[150px]" />
          </div>
          <Button 
            type="submit" 
            disabled={isSending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-headline py-6"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            {isSending ? 'TRANSMITTING...' : 'TRANSMIT_PACKET'}
          </Button>
          <p className="text-[10px] font-code text-center text-muted-foreground mt-4">
            DEDSEC_ENCRYPTION_LAYER_v4.2 ACTIVE
          </p>
        </form>
      </div>
    </HudContainer>
  )
}
