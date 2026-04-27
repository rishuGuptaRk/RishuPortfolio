
"use client"

import React from "react"
import Image from "next/image"
import { HudContainer } from "./hud-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Terminal } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { motion } from "framer-motion"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    synopsis: string
    description: string
    tech: string[]
    image: string
  }
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const imageData = PlaceHolderImages.find(img => img.id === project.image)

  return (
    <HudContainer className="h-full flex flex-col group/project transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(250,204,21,0.1)]">
      <div className="relative h-52 mb-6 overflow-hidden border border-primary/10">
        <Image
          src={imageData?.imageUrl || `https://picsum.photos/seed/${project.id}/600/400`}
          alt={project.title}
          fill
          className="object-cover transition-all duration-700 grayscale group-hover/project:grayscale-0 group-hover/project:scale-110"
          data-ai-hint={imageData?.imageHint || "tech project"}
          unoptimized={imageData?.imageUrl.endsWith('.gif')}
        />
        
        {/* Scanning Scanline Overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/project:opacity-100 transition-opacity pointer-events-none mix-blend-overlay overflow-hidden">
          <div className="w-full h-1 bg-primary/40 absolute top-0 animate-[scanline_1.5s_linear_infinite]"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/project:opacity-100 transition-all duration-300 translate-y-4 group-hover/project:translate-y-0">
          <div className="bg-primary/90 text-primary-foreground px-4 py-2 font-code text-[10px] uppercase tracking-widest shadow-xl">
            ACCESS_MODULE
          </div>
        </div>

        <div className="absolute bottom-2 left-2 flex gap-1 flex-wrap">
          {project.tech.map(t => (
            <Badge key={t} variant="secondary" className="text-[9px] py-0 h-4 uppercase font-code bg-background/80 backdrop-blur-sm border-primary/20">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="text-xl font-headline text-primary group-hover/project:text-accent transition-colors font-bold tracking-tighter">
            {project.title}
          </h4>
          <span className="text-[10px] font-code text-primary/40">[{project.id.split('-')[1]?.toUpperCase() || 'SYS'}]</span>
        </div>
        <p className="text-sm font-body text-muted-foreground/80 leading-relaxed line-clamp-3">
          {project.synopsis}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <Button size="sm" variant="outline" className="flex-1 font-code text-[10px] uppercase border-primary/40 hover:bg-primary/10 transition-colors">
          <Terminal className="w-3 h-3 mr-2" /> LOGS
        </Button>
        <Button size="sm" variant="default" className="flex-1 font-code text-[10px] uppercase bg-primary hover:bg-primary/90">
          <ExternalLink className="w-3 h-3 mr-2" /> EXECUTE
        </Button>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(5200%); }
        }
      `}</style>
    </HudContainer>
  )
}
