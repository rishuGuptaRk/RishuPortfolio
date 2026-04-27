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
import { ChevronDown, Terminal } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  
  const aboutMeImage = PlaceHolderImages.find(img => img.id === "about-me")
  const dedsecSkull = PlaceHolderImages.find(img => img.id === "dedsec-skull")

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
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  }

  const headlineVariants = {
    hidden: { y: "40%", opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.8, 
        delay: 0.5 + (i * 0.1), 
        ease: [0.33, 1, 0.68, 1] 
      } 
    })
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground font-body">
      <div className="scanline"></div>

      {/* Header Overlay */}
      <header className="fixed top-0 left-0 w-full z-[100] px-8 py-8 flex justify-between items-start">
        {/* Terminal Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-start gap-4"
        >
          <div className="w-12 h-12 border border-primary/40 bg-black/40 flex items-center justify-center font-code text-primary text-xl font-bold">
            {">_"}
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black font-headline tracking-tight text-white uppercase leading-none">RISHU_GUPTA</span>
            <span className="text-[10px] font-code text-primary/60 tracking-widest mt-1">SIT_NODE_ACTIVE // B.TECH CSE</span>
          </div>
        </motion.div>

        {/* Center Nav */}
        <div className="hidden lg:flex items-center gap-10 mt-2">
          {[
            { id: "projects", label: "REPOSITORIES" },
            { id: "skills", label: "TECH_STACK" },
            { id: "lab", label: "NEURAL_AI" },
            { id: "contact", label: "UPLINK" }
          ].map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-white hover:text-primary transition-colors relative"
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Status & Profile */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-8"
        >
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-[8px] font-code text-primary tracking-widest uppercase">STATUS: ENCRYPTED <span className="animate-pulse">⚡</span></span>
            <div className="flex gap-0.5">
              <div className="w-2 h-4 bg-primary/20"></div>
              <div className="w-2 h-4 bg-primary/40"></div>
              <div className="w-2 h-4 bg-primary/60"></div>
              <div className="w-2 h-4 bg-primary"></div>
            </div>
          </div>
          {profilePic && (
            <div className="relative w-12 h-12 border border-primary/20 bg-black/40 p-0.5 group">
              <div className="absolute inset-0 border border-primary/40 -m-1 group-hover:m-0 transition-all duration-300"></div>
              <div className="relative w-full h-full overflow-hidden">
                <Image 
                  src={profilePic} 
                  alt="Operative" 
                  fill 
                  className="object-cover grayscale brightness-110 contrast-125" 
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
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-8">
          {/* Background Dither Skull */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
            {dedsecSkull && (
              <Image 
                src={dedsecSkull.imageUrl} 
                alt="Dither Skull" 
                width={800} 
                height={800} 
                className="object-contain mix-blend-screen" 
                unoptimized 
              />
            )}
          </div>

          <div className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center space-y-4">
            <motion.div variants={itemVariants} className="flex items-center gap-4 text-primary font-code text-xs tracking-[0.4em] uppercase mb-4">
               <span className="h-[1px] w-8 bg-primary"></span>
               SYSTEM_INIT // CYBER_GUPTA
               <span className="h-[1px] w-8 bg-primary"></span>
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1 
                custom={0}
                variants={headlineVariants}
                className="text-7xl md:text-[140px] font-black font-headline text-white tracking-tighter uppercase leading-none glitch-text"
                data-text="RISHU GUPTA"
              >
                RISHU GUPTA
              </motion.h1>
            </div>

            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-4xl font-headline font-bold text-accent uppercase tracking-tighter flex items-center gap-4 flex-wrap justify-center"
            >
              FULL-STACK DEVELOPER & SOFTWARE ENGINEER
              <span className="text-muted-foreground/30 text-[10px] tracking-widest font-code">CLASS // CSE_2026_SIT</span>
            </motion.h2>

            <motion.p 
              variants={itemVariants}
              className="max-w-3xl text-lg text-muted-foreground/80 font-body leading-relaxed mt-8 border-l border-primary/30 pl-6 text-left"
            >
              {portfolioData.profile.bio}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 pt-12">
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-white px-8 py-4 text-xs font-bold font-headline uppercase tracking-widest flex items-center gap-2 hover:bg-primary/80 transition-all group"
              >
                ACCESS_RECORDS <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <button 
                onClick={handleDownloadCV}
                className="border border-white/20 bg-white/5 text-white px-8 py-4 text-xs font-bold font-headline uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                EXTRACT_INTEL (CV)
              </button>
            </motion.div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="w-px h-12 bg-primary"></div>
          </div>
        </section>

        {/* Repositories Section */}
        <section id="projects" className="py-32 relative border-t border-white/5 bg-black/20">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-16">
              <h3 className="text-2xl font-headline font-bold text-white tracking-tighter uppercase">REPOSITORY_FETCH</h3>
              <div className="h-px flex-1 bg-white/5"></div>
              <span className="text-[10px] font-code text-primary uppercase">INDEX_004</span>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData.projects.map((project, i) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="skills" className="py-32 relative border-y border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-20">
              <h3 className="text-2xl font-headline font-bold text-white tracking-tighter uppercase">SYSTEM_CAPABILITIES</h3>
              <div className="h-px flex-1 bg-white/5"></div>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              <motion.div variants={itemVariants}>
                <HudContainer title="SUBJECT_INTEL" variant="accent">
                  <div className="flex flex-col gap-8">
                    <div className="relative w-full h-80 border border-primary/20 bg-muted/20 group overflow-hidden">
                      {aboutMeImage?.imageUrl && (
                        <Image
                          src={aboutMeImage.imageUrl}
                          alt="Operative Profile"
                          fill
                          className="object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 font-code text-[10px] text-primary bg-black/80 px-3 py-1.5 border border-primary/40">
                        STATUS: OPERATIVE_STABLE
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-muted-foreground font-body leading-relaxed">
                        Computer Science undergraduate with a strong passion for <span className="text-primary font-bold">full-stack development</span> and <span className="text-primary font-bold">real-time systems</span>. 
                        Building products that bridge the gap between user-centric design and high-performance backend architecture.
                      </p>
                      <div className="flex flex-wrap gap-4 mt-6">
                        <div className="bg-primary/10 border border-primary/30 px-4 py-2 text-[10px] font-code text-primary uppercase">BACKEND_FOCUSED</div>
                        <div className="bg-primary/10 border border-primary/30 px-4 py-2 text-[10px] font-code text-primary uppercase">AI_INTEGRATOR</div>
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

        {/* AI Lab Section */}
        <section id="lab" className="py-32 bg-primary/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-16">
              <h3 className="text-2xl font-headline font-bold text-white tracking-tighter uppercase">NEURAL_AI_DOSSIER</h3>
              <div className="h-px flex-1 bg-white/5"></div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <AiDossierLab />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 border-t border-white/5 bg-black/40">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants}>
              <ContactModule />
            </motion.div>
          </div>
        </section>
      </motion.main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="container px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-primary/40 bg-black/40 flex items-center justify-center font-code text-primary text-lg font-bold">
                {">_"}
              </div>
              <div>
                <span className="text-xl font-black font-headline tracking-tight text-white uppercase leading-none block">RISHU_GUPTA</span>
                <p className="text-[10px] font-code text-muted-foreground/60 uppercase tracking-widest mt-1">© 2024 // ALL_CHANNELS_ENCRYPTED</p>
              </div>
            </div>
            
            <div className="flex gap-10">
              {portfolioData.profile.socials.map((social, i) => (
                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-xs font-headline font-bold tracking-widest uppercase">
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
