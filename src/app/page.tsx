
"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import portfolioData from "./data/portfolio.json"
import { GlitchText } from "@/components/glitch-text"
import { HudContainer } from "@/components/hud-container"
import { ProjectCard } from "@/components/project-card"
import { SkillMatrix } from "@/components/skill-matrix"
import { ContactModule } from "@/components/contact-module"
import { AiSynopsisTool } from "@/components/ai-synopsis-tool"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { LoadingScreen } from "@/components/loading-screen"
import { ChevronDown, Cpu, Globe, Terminal, User, Activity, Shield } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [randomProfilePic, setRandomProfilePic] = useState<string | null>(null)
  
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-bg")
  const aboutMeImage = PlaceHolderImages.find(img => img.id === "about-me")

  useEffect(() => {
    const profileOptions = PlaceHolderImages.filter(img => img.id.startsWith("profile-pic-"))
    if (profileOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * profileOptions.length)
      setRandomProfilePic(profileOptions[randomIndex].imageUrl)
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  const handleDownloadCV = () => {
    window.open('/pdf/Rishu_Gupta_Resume.pdf', '_blank')
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground animate-in fade-in duration-1000">
      <div className="scanline"></div>

      {/* Navigation - HW inspired */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black font-headline tracking-tighter text-white">RG<span className="text-primary">.</span></span>
        </div>

        <div className="hidden md:flex gap-12">
          {[
            { id: "hero", label: "HOME" },
            { id: "projects", label: "REPOSITORIES" },
            { id: "skills", label: "TECH_STACK" },
            { id: "lab", label: "NEURAL_AI" },
            { id: "contact", label: "CONTACT" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {item.label}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          ))}
        </div>

        <button 
          onClick={handleDownloadCV}
          className="bg-white text-black px-6 py-2 text-[11px] font-bold font-headline uppercase tracking-widest hover:bg-primary transition-colors"
        >
          RESUME
        </button>
      </nav>

      {/* Hero Section - Bold Typography inspired by Harsh Wardhan design */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-20">
        <div className="container px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12 space-y-4">
            <div className="flex items-center gap-4">
               <span className="font-code text-xs text-primary tracking-[0.4em] uppercase">// SYSTEM INITIALIZED</span>
            </div>
            
            <div className="space-y-0 leading-[0.85]">
              <h1 className="text-7xl md:text-[180px] font-black font-headline text-white tracking-tighter uppercase">
                RISHU
              </h1>
              <h1 className="text-7xl md:text-[180px] font-black font-headline tracking-tighter uppercase text-outline">
                GUPTA<span className="text-primary">.</span>
              </h1>
            </div>

            <div className="pt-24 grid md:grid-cols-2 gap-12 items-start border-t border-white/5">
              <div>
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase leading-none mb-4">
                  FULLSTACK<br />
                  <span className="text-primary">DEVELOPER</span>
                </h2>
                <div className="flex gap-4 items-center">
                  <div className="bg-white/10 px-3 py-1 font-code text-[10px] text-muted-foreground uppercase">Ctrl + K</div>
                  <span className="font-code text-[10px] text-muted-foreground uppercase tracking-widest">TERMINAL ACCESS</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-xl">
                  {portfolioData.profile.bio}
                </p>
                <button 
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex items-center gap-4 group"
                >
                  <span className="text-xs font-headline font-bold uppercase tracking-widest text-primary">SCAN_PROJECTS</span>
                  <div className="w-12 h-[1px] bg-primary group-hover:w-20 transition-all duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient background image element */}
        {heroImage?.imageUrl && (
          <div className="absolute inset-0 -z-10 opacity-10 grayscale brightness-50">
             <Image src={heroImage.imageUrl} alt="Background" fill className="object-cover" unoptimized />
          </div>
        )}
      </section>

      {/* Repositories Section */}
      <section id="projects" className="py-32 relative border-t border-white/5">
        <div className="container px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-primary"></div>
            <h3 className="text-xs font-headline font-bold text-primary tracking-[0.4em] uppercase">WORKS</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Dossier Section */}
      <section id="skills" className="py-32 relative bg-white/[0.02] border-y border-white/5">
        <div className="container px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-20">
            <div className="h-[1px] w-12 bg-primary"></div>
            <h3 className="text-xs font-headline font-bold text-primary tracking-[0.4em] uppercase">EXPERTISE</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            <HudContainer title="SUBJECT_DOSSIER" variant="accent">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="relative w-full md:w-56 h-72 shrink-0 border border-primary/20 bg-muted/20 group overflow-hidden">
                  {aboutMeImage?.imageUrl && (
                    <Image
                      src={aboutMeImage.imageUrl}
                      alt="Operative Profile"
                      fill
                      className="object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 font-code text-[10px] text-primary bg-background/80 px-2 py-1">
                    SIT_NODE_415
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-3xl font-headline text-white tracking-tighter uppercase font-bold">Background</h4>
                  <div className="space-y-4 text-muted-foreground font-body leading-relaxed text-sm">
                    <p>
                      Hands-on experience in building modern web applications and intelligent systems. Strong foundation in <span className="text-primary">Data Structures</span>, <span className="text-primary">DBMS</span>, and <span className="text-primary">Operating Systems</span>.
                    </p>
                    <p>
                      Certified MERN Stack Developer and J.P. Morgan Software Engineering Alumnus. Focused on creating impactful digital products with <span className="text-primary">REST APIs</span> and <span className="text-primary">Kafka</span>.
                    </p>
                  </div>
                </div>
              </div>
            </HudContainer>

            <SkillMatrix skills={portfolioData.skills} />
          </div>
        </div>
      </section>

      {/* AI Lab Section */}
      <section id="lab" className="py-32">
        <div className="container px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-primary"></div>
            <h3 className="text-xs font-headline font-bold text-primary tracking-[0.4em] uppercase">LOGIC_LAB</h3>
          </div>
          <AiSynopsisTool />
        </div>
      </section>

      {/* Uplink Section */}
      <section id="contact" className="py-32 border-t border-white/5">
        <div className="container px-8 max-w-7xl mx-auto">
          <ContactModule />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-black/40">
        <div className="container px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-6">
              <span className="text-3xl font-black font-headline tracking-tighter text-white">RG<span className="text-primary">.</span></span>
              <div>
                <p className="text-[10px] font-code text-muted-foreground/60 uppercase tracking-widest">© 2024 RISHU_GUPTA // ALL_RIGHTS_ENCRYPTED</p>
              </div>
            </div>
            
            <div className="flex gap-8">
              {portfolioData.profile.socials.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs font-headline font-bold tracking-widest uppercase">
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
