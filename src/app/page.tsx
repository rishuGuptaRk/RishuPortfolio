
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
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  
  const aboutMeImage = PlaceHolderImages.find(img => img.id === "about-me")

  useEffect(() => {
    // Local avatar images provided by user
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
    hidden: { y: "120%", opacity: 0, scaleY: 1.5 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1, 
      scaleY: 1,
      transition: { 
        duration: 1, 
        delay: 0.5 + (i * 0.15), 
        ease: [0.33, 1, 0.68, 1] 
      } 
    })
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <div className="scanline"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl font-black font-headline tracking-tighter text-white">RG<span className="text-primary">.</span></span>
        </motion.div>

        <div className="hidden md:flex items-center gap-12">
          {[
            { id: "hero", label: "HOME" },
            { id: "projects", label: "REPOSITORIES" },
            { id: "skills", label: "TECH_STACK" },
            { id: "lab", label: "DOSSIER_LAB" },
            { id: "contact", label: "CONTACT" }
          ].map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {item.label}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
          ))}
          <ThemeMatrix />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-6"
        >
          <button 
            onClick={handleDownloadCV}
            className="bg-white text-black px-6 py-2 text-[11px] font-bold font-headline uppercase tracking-widest hover:bg-primary transition-colors"
          >
            RESUME
          </button>
          {profilePic && (
            <div className="relative w-10 h-10 border border-primary/40 rounded-sm overflow-hidden bg-black/40 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <Image 
                src={profilePic} 
                alt="Operative" 
                fill 
                className="object-cover grayscale brightness-110 contrast-125" 
                unoptimized 
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none mix-blend-overlay"></div>
            </div>
          )}
        </motion.div>
      </nav>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
          <div className="container px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            <div className="lg:col-span-12 space-y-4">
              <motion.div variants={itemVariants} className="flex items-center gap-4">
                 <span className="font-code text-xs text-primary tracking-[0.4em] uppercase animate-pulse">// UPLINK_STABLE_ACCESS_GRANTED</span>
              </motion.div>
              
              <div className="space-y-0 leading-[0.85] overflow-hidden">
                <div className="overflow-hidden">
                  <motion.h1 
                    custom={0}
                    variants={headlineVariants}
                    className="text-7xl md:text-[180px] font-black font-headline text-white tracking-tighter uppercase"
                  >
                    RISHU
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1 
                    custom={1}
                    variants={headlineVariants}
                    className="text-7xl md:text-[180px] font-black font-headline tracking-tighter uppercase text-outline"
                  >
                    GUPTA<span className="text-primary">.</span>
                  </motion.h1>
                </div>
              </div>

              <motion.div variants={itemVariants} className="pt-24 grid md:grid-cols-2 gap-12 items-start border-t border-white/5">
                <div>
                  <h2 className="text-3xl md:text-5xl font-headline font-bold text-white uppercase leading-none mb-4">
                    FULLSTACK<br />
                    <span className="text-primary">ENGINEER</span>
                  </h2>
                  <div className="flex gap-4 items-center">
                    <div className="bg-white/10 px-3 py-1 font-code text-[10px] text-muted-foreground uppercase">SYSTEM_STABLE</div>
                    <span className="font-code text-[10px] text-muted-foreground uppercase tracking-widest">SF_LOCAL_NODE_415</span>
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
                    <span className="text-xs font-headline font-bold uppercase tracking-widest text-primary">INITIALIZE_REPOSITORY_SCAN</span>
                    <div className="w-12 h-[1px] bg-primary group-hover:w-20 transition-all duration-500"></div>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Repositories Section */}
        <section id="projects" className="py-32 relative border-t border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
              <div className="h-[1px] w-12 bg-primary"></div>
              <h3 className="text-xs font-headline font-bold text-primary tracking-[0.4em] uppercase">REPOSITORY_FETCH</h3>
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
        <section id="skills" className="py-32 relative bg-white/[0.01] border-y border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-20">
              <div className="h-[1px] w-12 bg-primary"></div>
              <h3 className="text-xs font-headline font-bold text-primary tracking-[0.4em] uppercase">SYSTEM_CAPABILITIES</h3>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-20 items-stretch">
              <motion.div variants={itemVariants}>
                <HudContainer title="SUBJECT_INTEL" variant="accent">
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
                        NODE_SF_415
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h4 className="text-3xl font-headline text-white tracking-tighter uppercase font-bold">OPERATIVE_BIO</h4>
                      <div className="space-y-4 text-muted-foreground font-body leading-relaxed text-sm">
                        <p>
                          Computer Science undergraduate with a strong passion for <span className="text-primary">full-stack development</span> and <span className="text-primary">real-time systems</span>. 
                        </p>
                        <p>
                          Building products that bridge the gap between user-centric design and high-performance backend architecture. Experienced in <span className="text-primary">distributed systems</span> and <span className="text-primary">AI integration</span>.
                        </p>
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
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
              <div className="h-[1px] w-12 bg-primary"></div>
              <h3 className="text-xs font-headline font-bold text-primary tracking-[0.4em] uppercase">DOSSIER_COMPILER</h3>
            </motion.div>
            <motion.div variants={itemVariants}>
              <AiDossierLab />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 border-t border-white/5">
          <div className="container px-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants}>
              <ContactModule />
            </motion.div>
          </div>
        </section>
      </motion.main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-black/40">
        <div className="container px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-6">
              <span className="text-3xl font-black font-headline tracking-tighter text-white">RG<span className="text-primary">.</span></span>
              <div>
                <p className="text-[10px] font-code text-muted-foreground/60 uppercase tracking-widest">© 2024 RISHU_GUPTA // ALL_CHANNELS_ENCRYPTED</p>
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
