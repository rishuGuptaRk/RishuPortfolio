
"use client"

import React from "react"
import Image from "next/image"
import { HudContainer } from "./hud-container"
import { motion } from "framer-motion"
import { User, Cpu, Code2, Rocket } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export const AboutMe = () => {
  const profileImg = PlaceHolderImages.find(img => img.id === "about-me")

  return (
    <HudContainer title="OPERATIVE_DOSSIER // RISHU_GUPTA" className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Profile Image Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative aspect-[3/4] border-2 border-primary/20 p-1 group">
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
            <div className="relative w-full h-full overflow-hidden">
              <Image 
                src={profileImg?.imageUrl || "https://picsum.photos/seed/rishu/800/1000"} 
                alt="Rishu Gupta" 
                fill 
                className="object-cover grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                unoptimized
              />
            </div>
            {/* Tactical Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] font-code text-muted-foreground uppercase">Identity</p>
                <p className="text-sm font-headline font-bold">FULLSTACK_OPERATIVE</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10">
              <Cpu className="w-5 h-5 text-primary" />
              <div>
                <p className="text-[10px] font-code text-muted-foreground uppercase">Base_Node</p>
                <p className="text-sm font-headline font-bold">SIT_CSE_2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-6">
            <h4 className="text-3xl font-headline font-black text-white tracking-tighter uppercase flex items-center gap-4">
              <Code2 className="w-8 h-8 text-primary" />
              SYSTEM_BIOGRAPHY
            </h4>
            
            <div className="border-l-2 border-primary/30 pl-8 space-y-6">
              <p className="text-muted-foreground leading-relaxed font-body text-lg">
                I’m <span className="text-primary font-bold">Rishu Gupta</span>, a Computer Science undergraduate and passionate full-stack developer who enjoys building real-time, scalable, and user-focused applications. I specialize in modern web technologies like <span className="text-white">React.js, Next.js, Node.js, Express.js, MongoDB, Firebase, and Java</span>, with a strong foundation in <span className="text-white">Data Structures, DBMS, Object-Oriented Programming, and system design</span>.
              </p>
              
              <p className="text-muted-foreground leading-relaxed font-body">
                I love turning ideas into practical digital solutions—whether it's developing synchronized watch-party platforms, AI-powered learning systems, e-commerce applications, or management dashboards. My focus is always on creating clean, efficient, and impactful software that solves real-world problems.
              </p>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <h5 className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">Core_Focus</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    Full-stack development, backend architecture, real-time systems, and AI-integrated applications.
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">Mission_Goal</h5>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    To build meaningful products and contribute to innovative technology solutions that challenge logic and creativity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-wrap gap-4">
            <div className="px-6 py-4 bg-primary/10 border border-primary/20 flex items-center gap-4 group hover:border-primary transition-colors">
              <Rocket className="w-6 h-6 text-primary group-hover:animate-bounce" />
              <div className="text-left">
                <p className="text-xl font-headline font-black text-white">10+</p>
                <p className="text-[10px] font-code text-muted-foreground uppercase">Live_Deployments</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-primary/10 border border-primary/20 flex items-center gap-4 group hover:border-primary transition-colors">
              <Code2 className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <p className="text-xl font-headline font-black text-white">4+</p>
                <p className="text-[10px] font-code text-muted-foreground uppercase">Core_Frameworks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HudContainer>
  )
}
