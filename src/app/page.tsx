
"use client"

import React from "react"
import Image from "next/image"
import portfolioData from "./data/portfolio.json"
import { GlitchText } from "@/components/glitch-text"
import { HudContainer } from "@/components/hud-container"
import { ProjectCard } from "@/components/project-card"
import { SkillMatrix } from "@/components/skill-matrix"
import { ContactModule } from "@/components/contact-module"
import { AiSynopsisTool } from "@/components/ai-synopsis-tool"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { ChevronDown, Cpu, Globe, Terminal, User, Activity, Shield } from "lucide-react"

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg")
  const logoAnim = PlaceHolderImages.find(img => img.id === "logo-anim")
  const profileImage = PlaceHolderImages.find(img => img.id === "about-me")

  return (
    <div className="min-h-screen selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
      <div className="scanline"></div>

      {/* Navigation HUD */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-4 flex justify-between items-center bg-background/60 backdrop-blur-xl border-b border-primary/10">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 border border-primary/40 group-hover:rotate-45 transition-transform duration-500"></div>
            <div className="absolute inset-1 border border-accent/40 group-hover:-rotate-45 transition-transform duration-500"></div>
            <Terminal className="text-primary group-hover:scale-110 transition-transform" />
          </div>
          <div className="hidden sm:block">
            <GlitchText text="CYBER_FOLIO" className="text-xl leading-none block" as="h1" />
            <p className="text-[9px] font-code text-primary/50 tracking-[0.3em] uppercase">DedSec_Uplink_Active</p>
          </div>
        </div>

        <div className="hidden md:flex gap-10">
          {[
            { id: "projects", label: "Software" },
            { id: "skills", label: "Capabilities" },
            { id: "lab", label: "AI_Core" },
            { id: "contact", label: "Network" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="relative group py-2"
            >
              <span className="text-[10px] font-code uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                {item.label}
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></div>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-code text-muted-foreground">LATENCY: 24ms</span>
              <Activity className="w-3 h-3 text-green-500" />
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`w-1 h-3 ${i <= 4 ? 'bg-primary' : 'bg-primary/20'}`}></div>
              ))}
            </div>
          </div>
          <div className="h-10 w-10 border border-primary/30 rounded-none overflow-hidden flex items-center justify-center bg-muted/20 relative group cursor-pointer">
             <div className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
             <User className="text-primary relative z-10" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        {heroImage?.imageUrl && (
          <Image
            src={heroImage.imageUrl}
            alt="DedSec Wallpaper"
            fill
            className="object-cover opacity-40 grayscale brightness-[0.6] scale-110"
            priority
            data-ai-hint="hacker network"
          />
        )}
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
        
        <div className="container relative z-10 px-6 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                 <div className="h-0.5 w-12 bg-primary"></div>
                 <span className="font-code text-xs text-primary tracking-[0.4em] animate-pulse">UPLINK_STABLE // {portfolioData.profile.handle.toUpperCase()}</span>
              </div>
              
              <div className="space-y-2">
                <GlitchText text={portfolioData.profile.name} className="text-5xl md:text-8xl font-black block leading-[0.8] mb-4" as="h1" />
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <h2 className="text-xl md:text-3xl font-headline text-accent uppercase tracking-tighter">
                    {portfolioData.profile.role}
                  </h2>
                  <div className="hidden md:block h-1 w-1 bg-muted-foreground rounded-full"></div>
                  <span className="font-code text-muted-foreground text-sm uppercase tracking-widest">OPERATIVE // DEDSEC_SF</span>
                </div>
              </div>

              <p className="max-w-xl mx-auto lg:mx-0 text-lg text-muted-foreground/90 leading-relaxed font-body border-l-2 border-primary/30 pl-6 py-2">
                {portfolioData.profile.bio}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6">
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary text-primary-foreground px-10 py-4 font-headline text-sm hover:bg-primary/90 transition-all flex items-center gap-4 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  ACCESS_REPOSITORY <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </button>
                <button className="border border-primary/30 text-primary px-10 py-4 font-headline text-sm hover:bg-primary/5 transition-all backdrop-blur-sm">
                  EXTRACT_INTEL (CV)
                </button>
              </div>
            </div>

            {/* Signature Area */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 shrink-0 group flex items-center justify-center">
              <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-4 border border-accent/20 rounded-full animate-reverse-spin opacity-20 group-hover:opacity-40 transition-opacity"></div>
              {logoAnim?.imageUrl && (
                <div className="relative w-48 h-24 md:w-64 md:h-32">
                   <Image 
                    src={logoAnim.imageUrl} 
                    alt="HUD Signature" 
                    fill 
                    className="object-contain animate-flicker grayscale contrast-125"
                    data-ai-hint="glitch bars"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* HUD Elements */}
        <div className="absolute bottom-12 right-12 flex items-center gap-6 opacity-30 hidden xl:flex">
          <div className="text-right">
            <p className="text-[8px] font-code text-primary uppercase">System_Core</p>
            <p className="text-[10px] font-code text-white">v2.4.0_STABLE</p>
          </div>
          <div className="w-px h-12 bg-primary/40"></div>
          <Activity className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative bg-card/20 border-y border-primary/5">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Cpu className="text-primary w-6 h-6" />
                <span className="font-code text-xs text-primary uppercase tracking-[0.3em]">Code_Infiltration_Modules</span>
              </div>
              <GlitchText text="Project_Logs" className="text-5xl font-headline" />
            </div>
            <div className="font-code text-[11px] text-muted-foreground border border-primary/20 p-4 bg-muted/10 backdrop-blur-sm">
              <div className="flex justify-between gap-12 mb-1">
                <span>RECORDS_FOUND:</span>
                <span className="text-primary">00{portfolioData.projects.length}</span>
              </div>
              <div className="flex justify-between gap-12">
                <span>AUTH_STATUS:</span>
                <span className="text-green-500">GRANTED</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="skills" className="py-32 relative overflow-hidden">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            <HudContainer title="SUBJECT_DOSSIER" className="flex flex-col">
              <div className="flex flex-col md:flex-row gap-10 mb-10">
                <div className="relative w-full md:w-56 h-72 shrink-0 border border-primary/20 bg-muted/20 group overflow-hidden">
                  <Image
                    src={profileImage?.imageUrl || "https://picsum.photos/seed/hacker-portrait/600/800"}
                    alt="Operative Profile"
                    fill
                    className="object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    data-ai-hint="cyberpunk portrait"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 font-code text-[10px] text-primary bg-background/80 px-2 py-1">
                    SF_NODE_415
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-3xl font-headline text-primary tracking-tighter uppercase">Operative_Bio</h4>
                  <div className="space-y-4 text-muted-foreground font-body leading-relaxed text-sm">
                    <p>
                      Active in the Bay Area cyber-scene for 10+ cycles. Transitioned from low-level vulnerability research into full-stack infrastructure engineering.
                    </p>
                    <p>
                      Specializes in building <span className="text-accent">high-availability node architectures</span> and <span className="text-accent">secure IoT bridges</span>.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-primary/10">
                    <div>
                      <p className="text-[9px] font-code text-primary/60 uppercase mb-1">Integrity</p>
                      <p className="text-xs font-headline text-green-500 tracking-widest">VERIFIED</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-code text-primary/60 uppercase mb-1">Signal</p>
                      <p className="text-xs font-headline text-accent tracking-widest">ENCRYPTED</p>
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
      <section id="lab" className="py-32 bg-card/10">
        <div className="container px-6 max-w-7xl mx-auto text-center mb-16">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="w-16 h-16 border border-accent/30 flex items-center justify-center rotate-45 group hover:rotate-90 transition-transform duration-700">
               <Globe className="text-accent w-8 h-8 -rotate-45 group-hover:-rotate-90 transition-transform" />
            </div>
            <span className="font-code text-xs text-accent uppercase tracking-[0.4em]">DedSec_Neural_Network</span>
          </div>
          <GlitchText text="AI_Synopsis_Generator" className="text-5xl font-headline mt-6 mb-6 block" />
          <p className="max-w-2xl mx-auto text-muted-foreground/80 font-body text-sm leading-relaxed">
            Feed raw project data into our distributed neural cluster. Our AI agent will synthesize a compelling tactical summary for your documentation.
          </p>
        </div>
        <div className="container px-6 max-w-7xl mx-auto">
          <AiSynopsisTool />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-background relative overflow-hidden border-t border-primary/5">
        <div className="container px-6 max-w-7xl mx-auto">
          <ContactModule />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-primary/10 bg-card/40 backdrop-blur-md">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 border-2 border-primary/40 flex items-center justify-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                <Shield className="w-6 h-6 text-primary relative z-10" />
              </div>
              <div>
                <p className="text-sm font-headline text-primary tracking-widest uppercase">DedSec_SF_Grid</p>
                <p className="text-[10px] font-code text-muted-foreground/60 uppercase tracking-widest">Everything is connected</p>
              </div>
            </div>
            
            <div className="flex gap-16 font-code text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">
              <div className="space-y-2">
                <p className="text-primary/40">Node_ID</p>
                <p className="text-foreground/70">SF-7712-A</p>
              </div>
              <div className="space-y-2">
                <p className="text-primary/40">Encryption</p>
                <p className="text-foreground/70">SHA-512_RSA</p>
              </div>
              <div className="space-y-2">
                <p className="text-primary/40">Signal</p>
                <p className="text-foreground/70 text-green-500">STABLE</p>
              </div>
            </div>

            <div className="flex gap-4">
              {portfolioData.profile.socials.map((social, i) => (
                <a key={i} href={social.url} className="w-12 h-12 border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
                  <Globe className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-code text-muted-foreground/30 uppercase tracking-[0.3em]">
              © 2024 CYBER_FOLIO // SYSTEM_CORE_v2.4.0
            </p>
            <div className="flex gap-4 text-[9px] font-code text-primary/30 uppercase tracking-widest">
              <span>Privacy_Policy</span>
              <span className="w-1 h-1 bg-primary/20 rounded-full mt-1"></span>
              <span>Terms_of_Infiltration</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
