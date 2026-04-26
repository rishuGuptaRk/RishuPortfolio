"use client"

import React from "react"
import { Progress } from "@/components/ui/progress"
import { HudContainer } from "./hud-container"

interface Skill {
  name: string
  level: number
  category: string
}

export const SkillMatrix = ({ skills }: { skills: Skill[] }) => {
  return (
    <HudContainer title="SYSTEM_CAPABILITIES_MATRIX" className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-code uppercase text-muted-foreground">
                [{skill.category}]
              </span>
              <span className="text-sm font-headline text-primary">
                {skill.name}
              </span>
            </div>
            <div className="relative h-4 w-full bg-muted/30 overflow-hidden border border-primary/20">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out flex items-center justify-end pr-2 overflow-hidden"
                style={{ width: `${skill.level}%` }}
              >
                <div className="w-full h-full opacity-20 bg-[linear-gradient(90deg,transparent_2px,white_2px)] bg-[size:4px_100%]"></div>
              </div>
            </div>
            <div className="flex justify-between text-[10px] font-code text-muted-foreground/50">
              <span>0%</span>
              <span>100%_SECURE</span>
            </div>
          </div>
        ))}
      </div>
    </HudContainer>
  )
}