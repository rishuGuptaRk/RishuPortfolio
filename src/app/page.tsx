
"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import portfolioData from "./data/portfolio.json"
import recoveryData from "./lib/recovery-data.json"
import { ProjectCard } from "@/components/project-card"
import { SkillMatrix } from "@/components/skill-matrix"
import { ContactModule } from "@/components/contact-module"
import { AiDossierLab } from "@/components/ai-dossier-lab"
import { LoadingScreen } from "@/components/loading-screen"
import { ThemeMatrix } from "@/components/theme-matrix"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Terminal, Github, Linkedin, Twitter, ArrowRight } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  
  const profile = recoveryData.backup_data.profile || portfolioData.profile

  useEffect(() => {
    // Randomize between the two local avatar GIFs
    const localProfiles = [
      "/images/Ava1.gif",
      "/images/Ava-2.gif"
    ]
    const randomIndex = Math.floor(Math.random() * localProfiles.length)
    setProfilePic(localProfiles[randomIndex])
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const titleRiseVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] } 
    }
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground font-body">
      <div className="scanline"></div>

      {/* Navigation - Tactical boxed uplink */}
      <header className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-6 flex justify-between items-center bg-gradient-to-b from-background/90 to-transparent backdrop-blur-sm border-b border-white/5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
          <span className="text-2xl font-black font-headline tracking-tighter text-white">RG.</span>
          <div className="hidden sm:block h-6 w-px bg-white/10 mx-2" />
          <div className="hidden sm:flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[8px] font-code text-primary uppercase">SIGNAL_STABLE</span>
          </div>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-10">
          {[
            { id: "hero", label: "HOME" },
            { id: "projects", label: "REPOSITORIES" },
            { id: "skills", label: "TECH_STACK" },
            { id: "lab", label: "NEURAL_AI" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                const element = document.getElementById(item.id);
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex flex-col items-center gap-1"
            >
              <span className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-primary transition-colors">
                {item.label}
              </span>
              <div className="w-4 h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-all transform scale-x-0 group-hover:scale-x-100" />
            </button>
          ))}
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white/60 px-4 py-1.5 text-[10px] font-headline font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-all rounded-md"
          >
            UPLINK
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeMatrix />
          <button className="hidden sm:block bg-white text-background px-6 py-2.5 text-[9px] font-headline font-bold uppercase tracking-widest hover:bg-primary transition-all">
            RESUME
          </button>
          {profilePic && (
            <div className="relative w-10 h-10 border border-primary/30 p-0.5 overflow-hidden">
              <Image src={profilePic} alt="Operative" fill className="object-cover grayscale contrast-125" unoptimized />
            </div>
          )}
        </div>
      </header>

      <motion.main variants={containerVariants} initial="hidden" animate="visible">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32">
          <div className="relative z-10 space-y-4 max-w-7xl w-full">
            <motion.div variants={itemVariants} className="flex items-center gap-4 text-primary font-code text-[11px] tracking-[0.5em] uppercase opacity-80">
              <span className="w-12 h-px bg-primary/40" /> SYSTEM_INITIALIZED
            </motion.div>
            
            <div className="overflow-hidden space-y-2">
              <motion.h1 
                variants={titleRiseVariants}
                className="text-7xl md:text-[150px] font-black font-headline text-white tracking-tighter uppercase leading-[0.8]"
              >
                RISHU
              </motion.h1>
              <motion.h1 
                variants={titleRiseVariants}
                className="text-7xl md:text-[150px] font-black font-headline tracking-tighter uppercase leading-[0.8] flex items-end"
              >
                {/* GUPTA with tactical outline effect */}
                <span className="text-transparent" style={{ WebkitTextStroke: '2px hsl(var(--primary))' }}>GUPTA</span>
                <span className="text-primary ml-2 mb-2 md:mb-4">.</span>
              </motion.h1>
            </div>

            {/* Bottom Hero Info */}
            <div className="pt-24 grid md:grid-cols-12 gap-12 items-end border-t border-white/5">
              <div className="md:col-span-3 space-y-1">
                <h2 className="text-3xl md:text-4xl font-black font-headline text-white leading-none">FULLSTACK</h2>
                <h2 className="text-3xl md:text-4xl font-black font-headline text-primary leading-none uppercase">DEVELOPER</h2>
              </div>
              
              <div className="md:col-span-6 border-l border-primary/20 pl-8">
                <p className="max-w-xl text-muted-foreground leading-relaxed text-sm md:text-base font-body">
                  {profile.bio}
                </p>
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button 
                  onClick={() => document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-primary text-primary px-10 py-5 text-[10px] font-headline font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all flex items-center gap-3"
                >
                  ACCESS_DOSSIER <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Repositories */}
        <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="flex items-end justify-between mb-20">
            <div>
              <span className="text-[10px] font-code text-primary uppercase tracking-[0.4em] mb-4 block">// SELECTED_WORKS</span>
              <h3 className="text-4xl font-headline font-black text-white uppercase tracking-tighter">PROJECT_REPOSITORIES</h3>
            </div>
            <button className="text-[10px] font-headline font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest border-b border-muted-foreground/20 pb-1">VIEW_ALL_REPOS</button>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* System Capabilities */}
        <section id="skills" className="py-32 bg-primary/[0.02] border-y border-white/5 px-6 md:px-12">
          <div className="container max-w-7xl mx-auto">
            <SkillMatrix skills={portfolioData.skills} />
          </div>
        </section>

        {/* AI Lab */}
        <section id="lab" className="py-32 px-6 md:px-12">
          <div className="container max-w-7xl mx-auto">
            <AiDossierLab />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 border-t border-white/5 px-6 md:px-12">
          <div className="container max-w-7xl mx-auto">
            <ContactModule />
          </div>
        </section>
      </motion.main>

      <footer className="py-16 border-t border-white/5 text-center bg-black/40">
        <div className="flex justify-center gap-8 mb-8">
          <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
        </div>
        <p className="text-[10px] font-code text-muted-foreground/50 uppercase tracking-[0.3em]">
          © 2024 // RG_NODE_SF // SYSTEM_STABLE
        </p>
      </footer>

      {/* Background UI Markers */}
      <div className="fixed top-1/2 right-12 w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
    </div>
  )
}
