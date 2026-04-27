
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
    <div className="relative w-screen h-screen flex items-center justify-center flex-shrink-0 px-4 md:px-12">
      {/* Background Section Number */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-black text-primary/5 pointer-events-none select-none z-0 font-headline">
        0{index + 1}
      </div>

      <div className="container max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 md:gap-16 items-center relative z-10">
        {/* Left Content (Col 5) */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="text-primary font-headline font-bold text-[10px] tracking-[0.3em] uppercase">
              {project.category}
            </span>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-headline text-white leading-[0.9] tracking-tighter uppercase">
              {project.title}
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground/80 font-body leading-relaxed max-w-xl">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <div key={t} className="px-3 py-1 border border-primary/20 text-[10px] font-code text-primary/70 tracking-widest bg-primary/5">
                {t}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
            <div className="group">
              <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mb-1">Latency</p>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-xl md:text-2xl font-headline font-bold text-primary">{project.metrics.latency}</p>
              </div>
            </div>
            <div className="group">
              <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mb-1">Lighthouse</p>
              <div className="flex items-center gap-2">
                <Layout className="w-4 h-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-xl md:text-2xl font-headline font-bold text-primary">{project.metrics.lighthouse}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <Button className="bg-primary hover:bg-primary/80 text-primary-foreground font-headline font-bold h-12 px-8 rounded-none group flex-1 sm:flex-none">
              LAUNCH <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <button className="flex items-center justify-center gap-2 text-white/60 hover:text-primary font-headline font-bold text-xs uppercase tracking-widest transition-colors h-12 px-6 border border-white/5 hover:border-primary/50">
              <Github className="w-5 h-5" /> SOURCE
            </button>
          </div>
        </div>

        {/* Right Visual Panel (Col 7) */}
        <div className="lg:col-span-7 relative aspect-square md:aspect-video lg:aspect-square">
          <div className="absolute inset-0 border border-white/10 bg-black/40 backdrop-blur-sm rounded-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
            
            {/* Animated Center Core */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 md:w-64 md:h-64 rounded-full bg-primary/5 blur-[100px] animate-pulse" />
              <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 rounded-full border border-primary/30 flex items-center justify-center bg-black/60 backdrop-blur-2xl group-hover:scale-110 transition-transform duration-700">
                <Terminal className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                <div className="absolute inset-0 border border-primary/20 rounded-full animate-ping opacity-20" />
              </div>
            </div>
            
            {imageData && (
              <Image
                src={imageData.imageUrl}
                alt={project.title}
                fill
                className="object-cover opacity-20 grayscale contrast-125 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                unoptimized={imageData.imageUrl.endsWith('.gif')}
              />
            )}
            
            {/* Scanning Line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              <div className="w-full h-px bg-primary absolute top-0 animate-[scan_3s_linear_infinite]" />
            </div>
          </div>
          
          {/* Tactical Corner Elements */}
          <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary/50" />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary/50" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  )
}

export const ProjectShowcase = ({ projects }: { projects: Project[] }) => {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Horizontal translation logic: Translates from 0 to -(width of all projects except one)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}vw`])
  
  // Smooth spring for high-end feel
  const springX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Horizontal Scrolling Track */}
        <motion.div 
          style={{ x: springX }} 
          className="flex h-full"
        >
          {projects.map((project, index) => (
            <ProjectSlide 
              key={project.id} 
              project={project} 
              index={index} 
            />
          ))}
        </motion.div>

        {/* Global Section UI Decor */}
        <div className="absolute bottom-8 md:bottom-12 left-8 md:left-12 z-20 hidden sm:flex items-center gap-6">
          <div className="h-px w-16 md:w-24 bg-primary/20" />
          <span className="text-[8px] md:text-[10px] font-code text-primary/40 uppercase tracking-[0.5em]">
            REPOSITORY_SCROLL_MODE_ACTIVE
          </span>
        </div>
      </div>
    </section>
  )
}
