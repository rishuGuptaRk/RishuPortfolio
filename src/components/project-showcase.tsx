
"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ExternalLink, Github, Zap, Activity, Layout } from "lucide-react"
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

const ProjectCard = ({ project, index, total }: { project: Project; index: number; total: number }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 1], [0.8, 1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.2, 1], [100, 0, -50])

  const imageData = PlaceHolderImages.find(img => img.id === project.image)

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center sticky top-0 overflow-hidden">
      <motion.div 
        style={{ opacity, scale, y }}
        className="container max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-yellow-400/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-yellow-400 font-headline font-bold text-[10px] tracking-[0.3em] uppercase">
              {project.category}
            </span>
          </div>

          <div className="relative">
            <h2 className="text-6xl md:text-8xl font-black font-headline text-white leading-none tracking-tighter uppercase mb-6">
              {project.title}
            </h2>
            <div className="absolute -left-12 top-0 text-[180px] font-black text-white/5 pointer-events-none select-none">
              0{index + 1}
            </div>
          </div>

          <p className="text-lg text-muted-foreground/80 font-body leading-relaxed max-w-xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <div key={t} className="px-3 py-1 border border-white/20 text-[10px] font-code text-white/60 tracking-widest bg-white/5">
                {t}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-12 pt-4 border-t border-white/10">
            <div>
              <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mb-1">Latency</p>
              <p className="text-2xl font-headline font-bold text-yellow-400">{project.metrics.latency}</p>
            </div>
            <div>
              <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mb-1">Lighthouse</p>
              <p className="text-2xl font-headline font-bold text-yellow-400">{project.metrics.lighthouse}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-headline font-bold h-12 px-8 rounded-none group">
              LAUNCH <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <button className="flex items-center gap-2 text-white/60 hover:text-white font-headline font-bold text-xs uppercase tracking-widest transition-colors">
              <Github className="w-5 h-5" /> SOURCE
            </button>
          </div>
        </div>

        {/* Right Visual Panel */}
        <div className="relative aspect-square">
          <div className="absolute inset-0 border border-white/10 bg-[#080808] rounded-md overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-green-500/10 blur-[100px] animate-pulse" />
              <div className="relative z-10 w-32 h-32 rounded-full border border-green-500/30 flex items-center justify-center bg-black/40 backdrop-blur-xl group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-12 h-12 text-yellow-400" />
                <div className="absolute inset-0 border border-yellow-400/20 rounded-full animate-ping opacity-20" />
              </div>
            </div>
            
            <Image
              src={imageData?.imageUrl || `https://picsum.photos/seed/${project.id}/1200/1200`}
              alt={project.title}
              fill
              className="object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
              unoptimized={imageData?.imageUrl.endsWith('.gif')}
            />
          </div>
          
          {/* Corner Elements */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t border-l border-yellow-400/50" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b border-r border-yellow-400/50" />
        </div>
      </motion.div>
    </div>
  )
}

export const ProjectShowcase = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="bg-[#050505] relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="relative">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            total={projects.length} 
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
