"use client"

import React from "react"
import Image from "next/image"
import { HudContainer } from "./hud-container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Terminal } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

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
    <HudContainer className="h-full flex flex-col group/project">
      <div className="relative h-48 mb-4 overflow-hidden border border-primary/20">
        <Image
          src={imageData?.imageUrl || `https://picsum.photos/seed/${project.id}/600/400`}
          alt={project.title}
          fill
          className="object-cover transition-all duration-500 grayscale group-hover/project:grayscale-0 group-hover/project:scale-110"
          data-ai-hint={imageData?.imageHint || "tech project"}
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/project:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
        <div className="absolute top-2 right-2 flex gap-1">
          {project.tech.slice(0, 2).map(t => (
            <Badge key={t} variant="secondary" className="text-[10px] py-0 h-4 uppercase font-code bg-secondary/80 text-secondary-foreground">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h4 className="text-xl font-headline text-primary group-hover/project:text-accent transition-colors mb-2">
          {project.title}
        </h4>
        <p className="text-sm font-body text-muted-foreground mb-4 line-clamp-3">
          {project.synopsis}
        </p>
      </div>

      <div className="mt-auto flex gap-2">
        <Button size="sm" variant="outline" className="flex-1 font-code text-xs uppercase border-primary/50 hover:bg-primary/10">
          <Terminal className="w-3 h-3 mr-2" /> Details
        </Button>
        <Button size="sm" variant="default" className="flex-1 font-code text-xs uppercase bg-primary hover:bg-primary/90">
          <ExternalLink className="w-3 h-3 mr-2" /> Live
        </Button>
      </div>
    </HudContainer>
  )
}