
"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import portfolioData from "./data/portfolio.json"
import { HudContainer } from "@/components/hud-container"
import { ProjectCard } from "@/components/project-card"
import { SkillMatrix } from "@/components/skill-matrix"
import { ContactModule } from "@/components/contact-module"
import { AiDossierLab } from "@/components/ai-dossier-lab"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { LoadingScreen } from "@/components/loading-screen"
import { ThemeMatrix } from "@/components/theme-matrix"
import { motion } from "framer-motion"
import { ChevronDown, Terminal, Zap } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  
  const dedsecSkull = PlaceHolderImages.find(img => img.id === "dedsec-skull")
  const aboutMeImage = PlaceHolderImages.find(img => img.id === "about-me")

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

  const handleDownloadCV = () => {
    window.open('/pdf/Rishu_Gupta_Resume.pdf', '_blank')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  }

  const headlineVariants = {
    hidden: { y: "60%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.9, 
        ease: [0.33, 1, 0.68, 1] 
      } 
    }
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground font-body">
      <div className="scanline"></div>

      {/* Tactical Header */}
      <header className="fixed top-0 left-0 w-full z-[100] px-8 py-8 flex justify-between items-center bg-gradient-to-b from-background via-background/80 to-transparent">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-10 h-10 border border-primary/40 bg-black/60 flex items-center justify-center font-code text-primary text-lg font-bold">
            {">_"}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black font-headline tracking-tighter text-white uppercase leading-none">RISHU_GUPTA</span>
            <span className="text-[8px] font-code text-primary/60 tracking-widest mt-0.5">SIT_NODE_ACTIVE // B.TECH CSE</span>
          </div>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-12">
          {[
            { id: "projects", label: "REPOSITORIES" },
            { id: "skills", label: "TECH_STACK" },
            { id: "lab", label: "NEURAL_AI" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-[10px] font-headline font-bold uppercase tracking-[0.25em] text-white/70 hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: "smooth" })}
            className="border border-white/20 px-6 py-2 text-[10px] font-headline font-bold uppercase tracking-[0.25em] text-white hover:bg-white/5 transition-all"
          >
            UPLINK
          </button>
        </nav>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[8px] font-code text-primary tracking-widest uppercase">STATUS: ENCRYPTED</span>
              <Zap className="w-2.5 h-2.5 text-accent animate-pulse" />
            </div>
            <div className="flex gap-0.5">
              <div className="w-2 h-3.5 bg-primary/20"></div>
              <div className="w-2 h-3.5 bg-primary/40"></div>
              <div className="w-2 h-3.5 bg-primary/60"></div>
              <div className="w-2 h-3.5 bg-primary animate-flicker"></div>
            </div>
          </div>
          {profilePic && (
            <div className="relative w-11 h-11 border border-primary/30 bg-black/40 p-0.5">
              <div className="absolute inset-0 border border-primary/20 -m-1"></div>
              <div className="relative w-full h-full overflow-hidden">
                <Image 
                  src={profilePic} 
                  alt="Operative" 
                  fill 
                  className="object-cover grayscale brightness-125 contrast-125" 
                  unoptimized 
                />
              </div>
            </div>
          )}
        </motion.div>
      </header>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left-Aligned Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col items-start justify-center pt-24 px-8 lg:px-24">
          {/* Central Background Skull */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.15] pointer-events-none">
            {dedsecSkull && (
              <Image 
                src={dedsecSkull.imageUrl} 
                alt="System Background" 
                width={700} 
                height={700} 
                className="object-contain mix-blend-screen grayscale" 
                unoptimized 
              />
            )}
          </div>

          <div className="relative z-10 w-full flex flex-col items-start space-y-6 max-w-7xl">
            <motion.div variants={itemVariants} className="flex items-center gap-6 text-primary font-code text-[11px] tracking-[0.4em] uppercase mb-4 opacity-70">
               <span className="h-[1px] w-12 bg-primary"></span>
               SYSTEM_INIT // CYBER_GUPTA
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1 
                variants={headlineVariants}
                className="text-7xl md:text-[140px] font-black font-hacked text-white tracking-tighter uppercase leading-[0.85] mb-2"
                style={{ textShadow: "0 0 40px rgba(139, 92, 246, 0.2)" }}
              >
                RISHU GUPTA
              </motion.h1>
            </div>

            <motion.div variants={itemVariants} className="flex items-center gap-6 w-full flex-wrap">
              <h2 className="text-2xl md:text-5xl font-headline font-bold text-accent uppercase tracking-tighter text-outline">
                FULL-STACK DEVELOPER & SOFTWARE ENGINEER
              </h2>
              <span className="text-muted-foreground/30 text-[10px] tracking-[0.3em] font-code uppercase ml-auto lg:ml-0">
                CLASS // CSE_2026_SIT
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-3xl mt-8">
              <div className="border-l-2 border-primary/40 pl-8 py-2">
                <p className="text-lg text-muted-foreground/90 font-body leading-relaxed">
                  {portfolioData.profile.bio}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-12">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-white px-10 py-5 text-xs font-bold font-headline uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-primary/80 transition-all group"
              >
                ACCESS_RECORDS <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <button 
                onClick={handleDownloadCV}
                className="border border-white/20 bg-white/5 text-white px-10 py-5 text-xs font-bold font-headline uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
              >
                EXTRACT_INTEL (CV)
              </button>
            </motion.div>
          </div>
          
          <div className="absolute bottom-12 left-24 hidden lg:block">
            <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent opacity-40"></div>
          </div>
        </section>

        {/* Repositories Section */}
        <section id="projects" className="py-32 relative border-t border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-6 mb-16">
              <h3 className="text-2xl font-headline font-bold text-white tracking-tighter uppercase">REPOSITORY_FETCH</h3>
              <div className="h-[1px] flex-1 bg-white/5"></div>
              <span className="text-[10px] font-code text-primary/60 uppercase tracking-widest">INDEX_v2.4</span>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="skills" className="py-32 relative border-y border-white/5 bg-primary/[0.02]">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-6 mb-20">
              <h3 className="text-2xl font-headline font-bold text-white tracking-tighter uppercase">SYSTEM_CAPABILITIES</h3>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              <motion.div variants={itemVariants}>
                <HudContainer title="SUBJECT_INTEL" variant="accent">
                  <div className="flex flex-col gap-8">
                    <div className="relative w-full h-96 border border-primary/20 bg-muted/20 overflow-hidden group">
                      {aboutMeImage?.imageUrl && (
                        <Image
                          src={aboutMeImage.imageUrl}
                          alt="Operative Profile"
                          fill
                          className="object-cover grayscale contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 font-code text-[10px] text-primary bg-black/80 px-4 py-2 border border-primary/40">
                        STATUS: OPERATIVE_ACTIVE
                      </div>
                    </div>
                    <div className="space-y-6">
                      <p className="text-muted-foreground font-body leading-relaxed text-lg">
                        Computer Science undergraduate with a strong passion for <span className="text-primary font-bold">full-stack development</span> and <span className="text-primary font-bold">real-time systems</span>. 
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-primary/10 border border-primary/30 px-5 py-2 text-[10px] font-code text-primary uppercase tracking-widest">BACKEND_FOCUSED</div>
                        <div className="bg-primary/10 border border-primary/30 px-5 py-2 text-[10px] font-code text-primary uppercase tracking-widest">AI_INTEGRATOR</div>
                      </div>
                    </div>
                  </div>
                </HudContainer>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SkillMatrix skills={portfolioData.skills} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Dossier Section */}
        <section id="lab" className="py-32 border-b border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-6 mb-16">
              <h3 className="text-2xl font-headline font-bold text-white tracking-tighter uppercase">NEURAL_AI_DOSSIER</h3>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <AiDossierLab />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 bg-black/40">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants}>
              <ContactModule />
            </motion.div>
          </div>
        </section>
      </motion.main>

      {/* Tactical Footer */}
      <footer className="py-24 border-t border-white/5">
        <div className="container px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 border border-primary/40 bg-black/60 flex items-center justify-center font-code text-primary text-xl font-bold">
                {">_"}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-headline tracking-tighter text-white uppercase leading-none">RISHU_GUPTA</span>
                <p className="text-[10px] font-code text-muted-foreground/50 uppercase tracking-[0.3em] mt-1.5">© 2024 // DEDSEC_SF_NODE // ENCRYPTED</p>
              </div>
            </div>
            
            <div className="flex gap-12">
              {portfolioData.profile.socials.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary transition-colors text-[10px] font-headline font-bold tracking-[0.3em] uppercase">
                  {social.platform}
                </a>
              ))}
            </div>
            
            <ThemeMatrix />
          </div>
        </div>
      </footer>
    </div>
  )
}
