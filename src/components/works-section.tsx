
"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Zap, Activity, Layout, Terminal, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import portfolioData from "@/app/data/portfolio.json"
import { PlaceHolderImages } from "@/lib/placeholder-images"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  category: string
  description: string
  tech: string[]
  github: string
  metrics: {
    latency: string
    lighthouse: string
  }
  image: string
}

export const WorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const trigger = triggerRef.current

    if (!section || !trigger) return

    const totalWidth = section.scrollWidth
    const viewportWidth = window.innerWidth

    const scrollTween = gsap.to(section, {
      x: () => -(totalWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      scrollTween.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="bg-[#050505] overflow-x-clip" ref={triggerRef}>
      <div ref={sectionRef} className="flex flex-nowrap h-screen w-fit bg-[#050505]">
        {portfolioData.projects.map((project: Project, index: number) => {
          const imageData = PlaceHolderImages.find(img => img.id === project.image)
          
          return (
            <section
              key={project.id}
              className="relative w-screen h-screen flex items-center justify-center flex-shrink-0 px-6 md:px-12 border-r border-white/5"
            >
              {/* Background Index Number */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 text-[15vw] font-black text-primary/5 pointer-events-none select-none z-0 font-headline leading-none">
                0{index + 1}
              </div>

              <div className="container max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 md:gap-20 items-center relative z-10">
                {/* Info Panel */}
                <div className="lg:col-span-5 space-y-6 md:space-y-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-primary/30 flex items-center justify-center bg-primary/5">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-primary font-headline font-bold text-[10px] md:text-[11px] tracking-[0.3em] uppercase">
                      {project.category}
                    </span>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-headline text-white leading-[1] tracking-tighter uppercase">
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

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                    <div className="group">
                      <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mb-2">LATENCY_STABLE</p>
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                        <p className="text-2xl md:text-4xl font-headline font-bold text-primary">{project.metrics.latency}</p>
                      </div>
                    </div>
                    <div className="group">
                      <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mb-2">LIGHTHOUSE_SCORE</p>
                      <div className="flex items-center gap-2">
                        <Layout className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                        <p className="text-2xl md:text-4xl font-headline font-bold text-primary">{project.metrics.lighthouse}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-8">
                    <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-headline font-bold h-14 px-10 rounded-none group flex-1 sm:flex-none shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                      LAUNCH_SYSTEM <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 text-white/60 hover:text-primary font-headline font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all h-14 px-8 border border-white/5 hover:border-primary/50 bg-white/5"
                    >
                      <Github className="w-5 h-5" /> SOURCE_CODE
                    </a>
                  </div>
                </div>

                {/* Preview Lab Panel */}
                <div className="lg:col-span-7 relative aspect-video hidden lg:block">
                  <div className="absolute inset-0 border border-white/10 bg-black/60 backdrop-blur-md rounded-sm overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-64 h-64 rounded-full bg-primary/10 blur-[120px] animate-pulse" />
                      <div className="relative z-10 w-24 h-24 rounded-full border border-primary/30 flex items-center justify-center bg-black/80 backdrop-blur-3xl group-hover:scale-110 transition-transform duration-1000 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                        <Terminal className="w-10 h-10 text-primary animate-flicker" />
                        <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping opacity-30" />
                      </div>
                    </div>
                    
                    {imageData && (
                      <div className="relative w-full h-full p-1">
                        <Image
                          src={imageData.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover opacity-40 grayscale contrast-150 group-hover:opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                          unoptimized={imageData.imageUrl.endsWith('.gif')}
                        />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-primary" />
                    
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent absolute top-0 animate-[scan_4s_linear_infinite]" />
                    </div>
                  </div>
                  
                  {/* Tactical Corners */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/60" />
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/60" />
                </div>
              </div>

              {/* Status Bar */}
              <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center justify-between pointer-events-none hidden md:flex">
                <div className="flex items-center gap-6">
                  <div className="h-px w-24 bg-primary/30" />
                  <span className="text-[10px] font-code text-primary/60 uppercase tracking-[0.5em] animate-pulse">
                    REPOSITORY_VIEWER_0{index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-code text-primary/40 uppercase tracking-widest">
                    SYSTEM_STABLE // GUPTA_SF
                  </span>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </section>
          )
        })}
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
