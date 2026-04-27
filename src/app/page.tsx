"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import portfolioData from "./data/portfolio.json"
import recoveryData from "./lib/recovery-data.json"
import { HudContainer } from "@/components/hud-container"
import { ProjectCard } from "@/components/project-card"
import { SkillMatrix } from "@/components/skill-matrix"
import { ContactModule } from "@/components/contact-module"
import { AiDossierLab } from "@/components/ai-dossier-lab"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { LoadingScreen } from "@/components/loading-screen"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Terminal, Github, Linkedin, Twitter } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  
  const profile = recoveryData.backup_data.profile || portfolioData.profile

  useEffect(() => {
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

      <header className="fixed top-0 left-0 w-full z-[100] px-8 py-8 flex justify-between items-center bg-gradient-to-b from-background/90 to-transparent backdrop-blur-sm">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
          <div className="w-10 h-10 border border-primary/40 bg-black/60 flex items-center justify-center font-code text-primary text-lg font-bold">
            {">_"}
          </div>
          <span className="font-headline font-bold tracking-tighter text-white uppercase">DEDSEC_SF_NODE</span>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-12">
          {["projects", "skills", "lab", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-[10px] font-headline font-bold uppercase tracking-[0.25em] text-white/70 hover:text-primary transition-colors"
            >
              {id.replace('_', ' ')}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {profilePic && (
            <div className="relative w-10 h-10 border border-primary/30 p-0.5 overflow-hidden rounded-sm">
              <Image src={profilePic} alt="Operative" fill className="object-cover grayscale contrast-125" unoptimized />
            </div>
          )}
        </div>
      </header>

      <motion.main variants={containerVariants} initial="hidden" animate="visible">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center pt-20">
          <div className="relative z-10 space-y-8 max-w-4xl">
            <motion.div variants={itemVariants} className="text-primary font-code text-[11px] tracking-[0.4em] uppercase opacity-70">
              SYSTEM_RECOVERY_SUCCESSFUL // ESTABLISHING_LINK
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1 
                variants={titleRiseVariants}
                className="text-7xl md:text-[140px] font-black font-hacked text-white tracking-tighter uppercase leading-[0.85]"
              >
                RISHU GUPTA
              </motion.h1>
            </div>

            <motion.h2 variants={itemVariants} className="text-xl md:text-3xl font-headline font-bold text-accent uppercase tracking-tighter">
              {profile.role}
            </motion.h2>

            <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-muted-foreground leading-relaxed text-lg">
              {profile.bio}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 pt-8">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-white px-8 py-4 text-xs font-bold font-headline uppercase tracking-widest hover:bg-primary/80 transition-all flex items-center gap-2"
              >
                ACCESS_RECORDS <ChevronDown className="w-4 h-4" />
              </button>
              <button className="border border-white/20 bg-white/5 text-white px-8 py-4 text-xs font-bold font-headline uppercase tracking-widest hover:bg-white/10 transition-all">
                EXTRACT_INTEL
              </button>
            </motion.div>
          </div>
        </section>

        {/* Repositories */}
        <section id="projects" className="py-32 border-t border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.h3 variants={itemVariants} className="text-2xl font-headline font-bold text-white mb-16 uppercase tracking-widest">
              [REPOSITORY_FETCH]
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* System Capabilities */}
        <section id="skills" className="py-32 bg-primary/[0.02] border-y border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <SkillMatrix skills={portfolioData.skills} />
          </div>
        </section>

        {/* AI Lab */}
        <section id="lab" className="py-32">
          <div className="container px-8 max-w-7xl mx-auto">
            <AiDossierLab />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 border-t border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <ContactModule />
          </div>
        </section>
      </motion.main>

      <footer className="py-16 border-t border-white/5 text-center">
        <div className="flex justify-center gap-8 mb-8">
          <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
          <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
        </div>
        <p className="text-[10px] font-code text-muted-foreground/50 uppercase tracking-[0.3em]">
          © 2024 // DEDSEC_SF // SYSTEM_STABLE
        </p>
      </footer>
    </div>
  )
}