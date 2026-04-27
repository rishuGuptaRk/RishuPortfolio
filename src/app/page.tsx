
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
import { AboutMe } from "@/components/about-me"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { ChevronDown, Terminal, Github, Linkedin, Twitter, ArrowRight, Zap, Info } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isNavigating, setIsNavigating] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [profilePic, setProfilePic] = useState<string | null>(null)
  
  const profile = recoveryData.backup_data.profile || portfolioData.profile
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const localProfiles = ["/images/Ava1.gif", "/images/Ava-2.gif"]
    setProfilePic(localProfiles[Math.floor(Math.random() * localProfiles.length)])

    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "lab", "contact"]
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top >= -200 && rect.top <= 400
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    setIsNavigating(true)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    
    // Trigger transition visual effect
    setTimeout(() => setIsNavigating(false), 800)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
    }
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground font-body">
      <div className="scanline"></div>
      
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left" style={{ scaleX }} />

      {/* Navigation Infiltration Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[105] bg-primary/5 backdrop-blur-[2px] pointer-events-none flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-4 bg-black/80 border border-primary/40 px-6 py-3 rounded-sm shadow-[0_0_30px_rgba(0,255,255,0.2)]"
            >
              <Zap className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-[10px] font-headline font-bold tracking-[0.3em] text-white">RE_ROUTING_PACKETS...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            { id: "about", label: "ABOUT_OPERATIVE" },
            { id: "projects", label: "REPOSITORIES" },
            { id: "skills", label: "TECH_STACK" },
            { id: "lab", label: "NEURAL_AI" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group relative flex flex-col items-center gap-1"
            >
              <span className={`text-[10px] font-headline font-bold uppercase tracking-[0.2em] transition-colors ${activeSection === item.id ? 'text-primary' : 'text-white/50 group-hover:text-primary'}`}>
                {item.label}
              </span>
              <motion.div 
                className="absolute -bottom-2 w-full h-0.5 bg-primary"
                initial={false}
                animate={{ scaleX: activeSection === item.id ? 1 : 0, opacity: activeSection === item.id ? 1 : 0 }}
              />
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact')}
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

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32">
          <div className="relative z-10 space-y-4 max-w-7xl w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-primary font-code text-[11px] tracking-[0.5em] uppercase opacity-80"
            >
              <span className="w-12 h-px bg-primary/40" /> SYSTEM_INITIALIZED
            </motion.div>
            
            <div className="overflow-hidden space-y-2">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                className="text-7xl md:text-[150px] font-black font-headline text-white tracking-tighter uppercase leading-[0.8]"
              >
                RISHU
              </motion.h1>
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="text-7xl md:text-[150px] font-black font-headline tracking-tighter uppercase leading-[0.8] flex items-end"
              >
                <span className="text-transparent" style={{ WebkitTextStroke: '2px hsl(var(--primary))' }}>GUPTA</span>
                <span className="text-primary ml-2 mb-2 md:mb-4">.</span>
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-24 grid md:grid-cols-12 gap-12 items-end border-t border-white/5"
            >
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
                  onClick={() => handleNavClick('about')}
                  className="border border-primary text-primary px-10 py-5 text-[10px] font-headline font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all flex items-center gap-3"
                >
                  ACCESS_DOSSIER <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Operative */}
        <motion.section 
          id="about" 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 px-6 md:px-12"
        >
          <div className="container max-w-7xl mx-auto">
            <AboutMe />
          </div>
        </motion.section>

        {/* Repositories */}
        <motion.section 
          id="projects" 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 px-6 md:px-12 max-w-7xl mx-auto"
        >
          <div className="flex items-end justify-between mb-20">
            <div>
              <span className="text-[10px] font-code text-primary uppercase tracking-[0.4em] mb-4 block animate-pulse">// SELECTED_WORKS</span>
              <h3 className="text-4xl font-headline font-black text-white uppercase tracking-tighter">PROJECT_REPOSITORIES</h3>
            </div>
            <button className="text-[10px] font-headline font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest border-b border-muted-foreground/20 pb-1">VIEW_ALL_REPOS</button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* System Capabilities */}
        <motion.section 
          id="skills" 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 bg-primary/[0.02] border-y border-white/5 px-6 md:px-12"
        >
          <div className="container max-w-7xl mx-auto">
            <SkillMatrix skills={portfolioData.skills} />
          </div>
        </motion.section>

        {/* AI Lab */}
        <motion.section 
          id="lab" 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 px-6 md:px-12"
        >
          <div className="container max-w-7xl mx-auto">
            <AiDossierLab />
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section 
          id="contact" 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 border-t border-white/5 px-6 md:px-12"
        >
          <div className="container max-w-7xl mx-auto">
            <ContactModule />
          </div>
        </motion.section>
      </main>

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
    </div>
  )
}
