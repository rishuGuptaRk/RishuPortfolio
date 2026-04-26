"use client"

import React from "react"
import { HudContainer } from "./hud-container"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github, Twitter, MessageSquare, Send, Radio } from "lucide-react"

export const ContactModule = () => {
  return (
    <HudContainer title="ENCRYPTED_COMMS_CHANNEL" className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h4 className="text-2xl font-headline text-primary mb-4">ESTABLISH_UPLINK</h4>
            <p className="text-muted-foreground font-body leading-relaxed">
              If you have projects that require a high degree of technical infiltration or a clean front-end finish, transmit your requirements through the secure form.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-code text-accent uppercase tracking-widest">Global Handlers</h5>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="flex items-center gap-2 p-3 bg-card border border-primary/20 hover:border-primary transition-all rounded group">
                <Github className="w-5 h-5 text-primary group-hover:text-accent" />
                <span className="text-sm font-code">Retr0_Code</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-3 bg-card border border-primary/20 hover:border-primary transition-all rounded group">
                <Twitter className="w-5 h-5 text-primary group-hover:text-accent" />
                <span className="text-sm font-code">@DedSec_Retr0</span>
              </a>
              <a href="#" className="flex items-center gap-2 p-3 bg-card border border-primary/20 hover:border-primary transition-all rounded group">
                <MessageSquare className="w-5 h-5 text-primary group-hover:text-accent" />
                <span className="text-sm font-code">DED_CHANNEL_7</span>
              </a>
            </div>
          </div>

          <div className="p-4 border-l-2 border-accent bg-accent/5 flex items-center gap-4">
            <Radio className="w-6 h-6 text-accent animate-pulse" />
            <div>
              <p className="text-[10px] font-code text-accent uppercase">Current Location</p>
              <p className="font-headline text-sm">SAN_FRANCISCO_NODE_415</p>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-code text-primary uppercase">Alias</label>
              <Input placeholder="OPERATIVE NAME" className="bg-background border-primary/30" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-code text-primary uppercase">Return Signal</label>
              <Input placeholder="EMAIL ADDRESS" className="bg-background border-primary/30" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Subject</label>
            <Input placeholder="TRANSMISSION TOPIC" className="bg-background border-primary/30" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-code text-primary uppercase">Payload</label>
            <Textarea placeholder="ENTER YOUR MESSAGE..." className="bg-background border-primary/30 min-h-[150px]" />
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-headline py-6">
            <Send className="w-4 h-4 mr-2" /> TRANSMIT_PACKET
          </Button>
          <p className="text-[10px] font-code text-center text-muted-foreground mt-4">
            DEDSEC_ENCRYPTION_LAYER_v4.2 ACTIVE
          </p>
        </form>
      </div>
    </HudContainer>
  )
}