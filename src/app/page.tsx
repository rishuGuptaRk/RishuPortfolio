"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import portfolioData from "./data/portfolio.json"
import { GlitchText } from "@/components/glitch-text"
import { HudContainer } from "@/components/hud-container"
import { ProjectCard } from "@/components/project-card"
import { SkillMatrix } from "@/components/skill-matrix"
import { ContactModule } from "@/components/contact-module"
import { AiSynopsisTool } from "@/components/ai-synopsis-tool"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ChevronDown, Cpu, Shield, Globe, Terminal, User, BookOpen, Mail } from "lucide-react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg")
  const profileImage = PlaceHolderImages.find(img => img.id === "about-me")

  return (
    <div className="min-h-screen">
      {/* Navigation HUD */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rotate-45 group cursor-pointer hover:rotate-180 transition-transform duration-500">
            <Terminal className="-rotate-45 group-hover:rotate-180 transition-transform text-primary-foreground" />
          </div>
          <div>
            <GlitchText text="CYBER_FOLIO" className="text-xl leading-none" as="h1" />
            <p className="text-[10px] font-code text-primary/70">v2.0.4_DEDSEC_EDITION</p>
          </div>
        </div>

        <div className="hidden md:flex gap-8">
          {[
            { id: "projects", icon: Cpu, label: "Projects" },
            { id: "skills", icon: Shield, label: "Skills" },
            { id: "lab", icon: Globe, label: "Hacker Lab" },
            { id: "contact", icon: Mail, label: "Comms" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="group flex flex-col items-center gap-1 hover:text-primary transition-colors"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-code uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-code text-muted-foreground">SIGNAL_STRENGTH</p>
            <div className="flex gap-0.5 mt-1">
              <div className="w-1 h-3 bg-primary"></div>
              <div className="w-1 h-3 bg-primary"></div>
              <div className="w-1 h-3 bg-primary"></div>
              <div className="w-1 h-3 bg-primary/20"></div>
            </div>
          </div>
          <div className="h-10 w-10 border border-primary rounded-full overflow-hidden flex items-center justify-center bg-card">
             <User className="text-primary" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/cyber1/1920/1080"}
          alt="Cyberpunk background"
          fill
          className="object-cover opacity-30 grayscale contrast-125"
          priority
          data-ai-hint="cyberpunk city"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        
        <div className="container relative z-10 px-6 max-w-6xl">
          <div className="space-y-6">
            <div className="inline-block border border-primary bg-primary/10 px-4 py-1">
              <span className="font-code text-xs text-primary animate-pulse tracking-widest">CONNECTING_TO_UPLINK... ESTABLISHED</span>
            </div>
            
            <GlitchText text={portfolioData.profile.name} className="text-6xl md:text-8xl font-black block" as="h1" />
            <div className="flex flex-wrap items-center gap-4">
              <GlitchText text={portfolioData.profile.role} className="text-xl md:text-3xl font-headline text-accent" as="h2" />
              <div className="h-0.5 w-12 bg-primary"></div>
              <span className="font-code text-muted-foreground uppercase tracking-widest">{portfolioData.profile.handle} // NODE_OPERATIVE</span>
            </div>

            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed font-body">
              {portfolioData.profile.bio}
            </p>

            <div className="flex gap-4 pt-6">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-primary-foreground px-8 py-3 font-headline hover:bg-primary/90 transition-all flex items-center gap-2 group"
              >
                ACCESS_PROJECTS <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <button className="border border-primary/50 text-primary px-8 py-3 font-headline hover:bg-primary/10 transition-all">
                DOWNLOAD_DATA_FILE (CV)
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary/50" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="text-primary w-5 h-5" />
                <span className="font-code text-xs text-primary uppercase tracking-widest">Modules_Repository</span>
              </div>
              <GlitchText text="Infiltration_Works" className="text-4xl font-headline" />
            </div>
            <div className="text-right font-code text-xs text-muted-foreground">
              [TOTAL_RECORDS: {portfolioData.projects.length}]<br/>
              [ACCESS_LEVEL: OPERATIVE]
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="skills" className="py-24 bg-card/20 border-y border-primary/10">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <HudContainer title="DOSSIER_RETR0">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-48 h-64 shrink-0 border border-primary/30">
                  <Image
                    src={profileImage?.imageUrl || "https://picsum.photos/seed/hacker-profile/600/800"}
                    alt="Operative Profile"
                    fill
                    className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    data-ai-hint="hacker profile"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(139,77,242,0.5)]"></div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-2xl font-headline text-primary">BACKGROUND_SCAN</h4>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">
                    Operative <span className="text-accent">Retr0</span> has been active in the San Francisco tech scene for over a decade. Starting in grey-hat security research, they transitioned into full-stack development to build the very systems they once audited.
                  </p>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">
                    Their expertise lies in the intersection of <span className="text-primary">User Experience</span> and <span className="text-primary">System Integrity</span>.
                  </p>
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-code text-primary uppercase">Current Node</p>
                      <p className="text-xs font-headline">SF_ZONE_0</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-code text-primary uppercase">Status</p>
                      <p className="text-xs font-headline text-green-500">ENCRYPTED</p>
                    </div>
                  </div>
                </div>
              </div>
            </HudContainer>

            <SkillMatrix skills={portfolioData.skills} />
          </div>
        </div>
      </section>

      {/* AI Tool Section */}
      <section id="lab" className="py-24">
        <div className="container px-6 max-w-7xl mx-auto text-center mb-12">
          <div className="flex flex-col items-center gap-2 mb-4">
            <Globe className="text-primary w-8 h-8 animate-spin-slow" />
            <span className="font-code text-xs text-primary uppercase tracking-widest">Experimental_Intelligence</span>
          </div>
          <GlitchText text="Gen_AI_Synopsis_Lab" className="text-4xl font-headline mb-4" />
          <p className="max-w-2xl mx-auto text-muted-foreground font-body">
            Use the DedSec neural network to generate compelling project synopses. Our LLM-based agent analyzes your code and produces the perfect pitch.
          </p>
        </div>
        <div className="container px-6 max-w-7xl mx-auto">
          <AiSynopsisTool />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 pb-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="container px-6 max-w-7xl mx-auto">
          <ContactModule />
        </div>
      </section>

      {/* Footer HUD Footer */}
      <footer className="py-12 border-t border-primary/20 bg-card/30">
        <div className="container px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 border border-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-headline text-primary">DEDSEC_OPERATIVE_v2</p>
              <p className="text-[10px] font-code text-muted-foreground">STAY_SAFE_STAY_HIDDEN</p>
            </div>
          </div>
          
          <div className="flex gap-12 font-code text-[10px] text-muted-foreground uppercase tracking-tighter">
            <div>
              <p className="mb-1 text-primary/70">Local_IP</p>
              <p>192.168.1.42</p>
            </div>
            <div>
              <p className="mb-1 text-primary/70">Encryption</p>
              <p>AES-256-GCM</p>
            </div>
            <div>
              <p className="mb-1 text-primary/70">Packet_Loss</p>
              <p>0.0001%</p>
            </div>
          </div>

          <div className="flex gap-4">
            {portfolioData.profile.socials.map((social, i) => (
              <a key={i} href={social.url} className="w-10 h-10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-110">
                <Globe className="w-5 h-5 text-primary" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-[10px] font-code text-muted-foreground opacity-50 uppercase">
            © 2024 CYBERFOLIO_SYSTEMS // ALL_RIGHTS_RESERVED_FOR_THOSE_WHO_CAN_FIND_THEM
          </p>
        </div>
      </footer>
    </div>
  )
}