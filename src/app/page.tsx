"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import portfolioData from "./data/portfolio.json"
import recoveryData from "./lib/recovery-data.json"
import { SkillMatrix } from "@/components/skill-matrix"
import { ContactModule } from "@/components/contact-module"
import { AiDossierLab } from "@/components/ai-dossier-lab"
import { LoadingScreen } from "@/components/loading-screen"
import { ThemeMatrix } from "@/components/theme-matrix"
import { AboutMe } from "@/components/about-me"
import { WorksSection } from "@/components/works-section"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { 
  Terminal, 
  ArrowRight, 
  Menu, 
  X,
  User,
  Cpu,
  Bot,
  Briefcase
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("hero")
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  
  const profile = recoveryData.backup_data.profile || portfolioData.profile
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const localProfiles = ["/images/Ava1.gif", "/images/Ava-2.gif", "/images/Ava3.gif"]
    setProfilePic(localProfiles[Math.floor(Math.random() * localProfiles.length)])

    const handleScroll = () => {
      const sections = ["hero", "about", "works", "skills", "lab", "contact"]
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top >= -300 && rect.top <= 300
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
    
    // 800ms "Deep Infiltration" sequence
    setTimeout(() => {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: "smooth" })
      
      setTimeout(() => {
        setIsNavigating(false)
      }, 400) 
    }, 800)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  const navItems = [
    { id: "hero", label: "HOME", icon: Terminal },
    { id: "about", label: "ABOUT", icon: User },
    { id: "works", label: "WORKS", icon: Briefcase },
    { id: "skills", label: "STACK", icon: Cpu },
    { id: "lab", label: "NEURAL", icon: Bot },
  ]

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary selection:text-primary-foreground font-body overflow-x-clip">
      <div className="scanline"></div>
      
      <AnimatePresence>
        {isNavigating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0.8, 1, 0.9, 1],
              backdropFilter: ["blur(0px)", "blur(10px)", "blur(5px)", "blur(15px)", "blur(8px)", "blur(20px)"]
            }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="fixed inset-0 z-[200] pointer-events-none bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/Anshul-69/DedSec-Terminal/main/dedsec.gif')] opacity-20 mix-blend-screen bg-center bg-no-repeat bg-contain" />
            
            <div className="relative flex flex-col items-center gap-6">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 0.9, 1.2, 1],
                  rotate: [0, 2, -2, 3, 0]
                }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="w-24 h-24 border-2 border-primary rounded-sm flex items-center justify-center bg-black"
              >
                <Terminal className="w-12 h-12 text-primary" />
              </motion.div>

              <div className="flex flex-col items-center">
                <motion.span 
                  animate={{ 
                    opacity: [1, 0.5, 1, 0.2, 1],
                    x: [0, 5, -5, 10, 0]
                  }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="text-primary font-headline text-2xl font-black tracking-[0.5em] uppercase"
                >
                  ACCESSING_NODE
                </motion.span>
                <div className="w-full h-1 bg-white/10 mt-2 relative overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute top-0 left-0 h-full bg-primary"
                  />
                </div>
                <span className="text-primary/40 font-code text-[10px] mt-2 tracking-widest uppercase">ENCRYPTING_TRAFFIC // BYPASSING_FIREWALL</span>
              </div>
            </div>

            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-primary shadow-[0_0_15px_hsl(var(--primary))] z-[210]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary z-[110] origin-left" style={{ scaleX }} />

      <header className="fixed top-0 left-0 w-full z-[100] px-4 md:px-12 py-4 md:py-6 flex justify-between items-center bg-gradient-to-b from-background/90 to-transparent backdrop-blur-sm border-b border-white/5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
          <span className="text-xl md:text-2xl font-black font-headline tracking-tighter text-white">RG.</span>
          <div className="hidden sm:block h-6 w-px bg-white/10 mx-2" />
          <div className="hidden sm:flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[8px] font-code text-primary uppercase">SIGNAL_STABLE</span>
          </div>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
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
            CONTACT_OPERATIVE
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ThemeMatrix />
          </div>
          
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary transition-colors rounded-sm">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 border-l border-primary/30 p-0 text-white w-full sm:max-w-xs">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <span className="font-headline font-black text-xl tracking-tighter">RG_CORE</span>
                    <SheetClose className="text-primary hover:rotate-90 transition-transform">
                      <X className="w-6 h-6" />
                    </SheetClose>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto py-8 px-6 space-y-6">
                    <div className="space-y-2">
                      <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                          <SheetClose asChild key={item.id}>
                            <button
                              onClick={() => handleNavClick(item.id)}
                              className={`flex items-center gap-4 p-4 border border-white/5 hover:border-primary/50 transition-all group ${activeSection === item.id ? 'bg-primary/10 border-primary/30' : ''}`}
                            >
                              <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-primary' : 'text-white/30 group-hover:text-primary'}`} />
                              <span className={`text-[11px] font-headline font-bold tracking-widest ${activeSection === item.id ? 'text-white' : 'text-white/60'}`}>
                                {item.label}
                              </span>
                            </button>
                          </SheetClose>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <button className="hidden sm:block bg-white text-background px-4 md:px-6 py-2 md:py-2.5 text-[9px] font-headline font-bold uppercase tracking-widest hover:bg-primary transition-all">
            RESUME
          </button>
          
          {profilePic && (
            <div className="relative w-8 h-8 md:w-10 md:h-10 border border-primary/30 p-0.5 overflow-hidden">
              <Image src={profilePic} alt="Operative" fill className="object-cover grayscale contrast-125" unoptimized />
            </div>
          )}
        </div>
      </header>

      <main className="relative">
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 pt-32 pb-12">
          <div className="relative z-10 space-y-4 max-w-7xl w-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-primary font-code text-[10px] md:text-[11px] tracking-[0.5em] uppercase opacity-80"
            >
              <span className="w-8 md:w-12 h-px bg-primary/40" /> SYSTEM_INITIALIZED
            </motion.div>
            
            <div className="overflow-hidden space-y-1 md:space-y-2">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                className="text-5xl sm:text-7xl md:text-[150px] font-black font-headline text-white tracking-widest uppercase leading-[0.8]"
              >
                RISHU
              </motion.h1>
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="text-5xl sm:text-7xl md:text-[150px] font-black font-headline tracking-widest uppercase leading-[0.8] flex items-end"
              >
                <span className="text-transparent" style={{ WebkitTextStroke: '2px hsl(var(--primary))' }}>GUPTA</span>
                <span className="text-primary ml-1 md:ml-2 mb-1 md:mb-4">.</span>
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="pt-12 md:pt-24 grid md:grid-cols-12 gap-8 md:gap-12 items-end border-t border-white/5"
            >
              <div className="md:col-span-3 space-y-1">
                <h2 className="text-2xl md:text-4xl font-black font-headline text-white leading-none">FULLSTACK</h2>
                <h2 className="text-2xl md:text-4xl font-black font-headline text-primary leading-none uppercase">DEVELOPER</h2>
              </div>
              
              <div className="md:col-span-6 md:border-l border-primary/20 md:pl-8">
                <p className="max-w-xl text-muted-foreground leading-relaxed text-xs md:text-base font-body">
                  {profile.bio}
                </p>
              </div>

              <div className="md:col-span-3 flex justify-start md:justify-end">
                <button 
                  onClick={() => handleNavClick('about')}
                  className="w-full md:w-auto border border-primary text-primary px-6 md:px-10 py-4 md:py-5 text-[10px] font-headline font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all flex items-center justify-center gap-3"
                >
                  ACCESS_DOSSIER <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-32 px-4 md:px-12">
          <div className="container max-w-7xl mx-auto">
            <AboutMe />
          </div>
        </section>

        <section id="works">
          <WorksSection />
        </section>

        <section id="skills" className="py-16 md:py-32 bg-primary/[0.02] border-y border-white/5 px-4 md:px-12">
          <div className="container max-w-7xl mx-auto">
            <SkillMatrix skills={portfolioData.skills} />
          </div>
        </section>

        <section id="lab" className="py-16 md:py-32 px-4 md:px-12">
          <div className="container max-w-7xl mx-auto">
            <AiDossierLab />
          </div>
        </section>

        <section id="contact" className="py-16 md:py-32 border-t border-white/5 px-4 md:px-12">
          <div className="container max-w-7xl mx-auto">
            <ContactModule />
          </div>
        </section>
      </main>

      <footer className="py-12 md:py-16 border-t border-white/5 text-center bg-black/40">
        <p className="text-[9px] md:text-[10px] font-code text-muted-foreground/50 uppercase tracking-[0.3em] px-4">
          © 2024 // RG_NODE_SF // SYSTEM_STABLE
        </p>
      </footer>
    </div>
  )
}
