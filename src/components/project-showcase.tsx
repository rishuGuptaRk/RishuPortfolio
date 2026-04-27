
"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ExternalLink, Github, Zap, Activity, Layout, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  metrics: {
    latency: string
    lighthouse: string
  }
  image: string
}

const ProjectSlide = ({ project, index }: { project: Project; index: number }) => {
  const imageData = PlaceHolderImages.find(img => img.id === project.image)

  return (
    <div className="relative w-screen h-screen flex items-center justify-center flex-shrink-0 px-4 md:px-12 overflow-hidden">
      {/* Background Section Number */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-black text-primary/5 pointer-events-none select-none z-0 font-headline leading-none">
        0{index + 1}
      </div>

      <div className="container max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 md:gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            <span className="text-primary font-headline font-bold text-[9px] md:text-[11px] tracking-[0.3em] uppercase">
              {project.category}
            </span>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-headline text-white leading-[0.9] tracking-tighter uppercase">
              {project.title}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground/80 font-body leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <div key={t} className="px-3 py-1 border border-primary/20 text-[9px] md:text-[11px] font-code text-primary/80 tracking-widest bg-primary/5 uppercase">
                {t}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
            <div className="group">
              <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mb-1">LATENCY_STABLE</p>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-2xl md:text-3xl font-headline font-bold text-primary">{project.metrics.latency}</p>
              </div>
            </div>
            <div className="group">
              <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mb-1">LIGHTHOUSE_SCORE</p>
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-2xl md:text-3xl font-headline font-bold text-primary">{project.metrics.lighthouse}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6">
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-headline font-bold h-12 px-10 rounded-none group flex-1 sm:flex-none">
              LAUNCH_SYSTEM <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <button className="flex items-center justify-center gap-3 text-white/60 hover:text-primary font-headline font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all h-12 px-8 border border-white/5 hover:border-primary/50 bg-white/5">
              <Github className="w-5 h-5" /> SOURCE_CODE
            </button>
          </div>
        </div>

        {/* Right Visual Panel */}
        <div className="lg:col-span-7 relative aspect-square hidden lg:block">
          <div className="absolute inset-0 border border-white/10 bg-black/60 backdrop-blur-md rounded-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-60" />
            
            {/* Interactive Core */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-primary/10 blur-[120px] animate-pulse" />
              <div className="relative z-10 w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center bg-black/80 backdrop-blur-3xl group-hover:scale-110 transition-transform duration-1000">
                <Terminal className="w-10 h-10 text-primary animate-flicker" />
                <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping opacity-30" />
              </div>
            </div>
            
            {imageData && (
              <Image
                src={imageData.imageUrl}
                alt={project.title}
                fill
                className="object-cover opacity-30 grayscale contrast-150 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000"
                unoptimized={imageData.imageUrl.endsWith('.gif')}
              />
            )}
            
            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-primary" />
            
            {/* Scanning Line Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent absolute top-0 animate-[scan_4s_linear_infinite]" />
            </div>
          </div>
          
          {/* Decorative HUD Elements */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/60" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/60" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-10vh); }
          100% { transform: translateY(110vh); }
        }
      `}</style>
    </div>
  )
}

export const ProjectShowcase = ({ projects }: { projects: Project[] }) => {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Horizontal translation logic: Map 0-1 scroll progress to 0 to -(N-1)*100vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(projects.length - 1) * 100}vw`])
  
  // High-stiffness spring for responsive tactile feel
  const springX = useSpring(x, {
    stiffness: 150,
    damping: 35,
    restDelta: 0.001
  })

  return (
    <section id="projects" ref={targetRef} className="relative h-[400vh] bg-[#050505]">
      {/* Sticky Container - locks while parent is scrolled */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Horizontal Track */}
        <motion.div 
          style={{ x: springX }} 
          className="flex h-full w-fit flex-nowrap"
        >
          {projects.map((project, index) => (
            <ProjectSlide 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </motion.div>

        {/* Global HUD Decor */}
        <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-6">
            <div className="h-px w-24 bg-primary/30" />
            <span className="text-[10px] font-code text-primary/60 uppercase tracking-[0.5em] animate-pulse">
              REPOSITORY_BROWSER_ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-code text-primary/40 uppercase tracking-widest">
              SYSTEM_STABLE // RG_041
            </span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
