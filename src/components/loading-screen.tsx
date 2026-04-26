
"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { GlitchText } from "./glitch-text"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")
  const heroGif = PlaceHolderImages.find(img => img.id === "hero-bg")

  useEffect(() => {
    // Simulated loading dots
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    // Hacker-style jumpy progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 1200) // Brief pause at 100% for impact
          return 100
        }
        // Random increments for a "crunchy" feel
        const jump = Math.floor(Math.random() * 20) + 5
        return Math.min(prev + jump, 100)
      })
    }, 150)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  const barCount = 24
  const filledCount = Math.floor((progress / 100) * barCount)
  const barString = "[" + "#".repeat(filledCount) + "-".repeat(barCount - filledCount) + "]"

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 select-none overflow-hidden font-code">
      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(139,77,242,0.15)_0%,transparent_70%)]"></div>

      {/* Centered GIF container */}
      <div className="relative w-72 h-40 mb-12 flex items-center justify-center">
        {heroGif?.imageUrl && (
          <Image 
            src={heroGif.imageUrl} 
            alt="System Breach" 
            fill 
            className="object-contain grayscale contrast-150 brightness-110"
            priority
            unoptimized // Useful for GIFs to ensure they play correctly
          />
        )}
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full animate-pulse"></div>
      </div>
      
      {/* Progress HUD */}
      <div className="w-full max-w-sm space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-primary text-[10px] tracking-[0.3em] uppercase font-bold">
                Infiltrating_Network{dots}
              </span>
              <span className="text-muted-foreground/40 text-[9px] mt-1 tracking-widest uppercase">
                Uplink: SF-NODE-415-STABLE
              </span>
            </div>
            <div className="text-right">
              <span className="text-primary text-xl font-headline tracking-tighter">
                {progress}%
              </span>
            </div>
          </div>
          
          {/* DedSec Bracketed Text Bar */}
          <div className="text-[11px] text-primary/90 tracking-[0.5em] leading-none text-center font-bold">
            {barString}
          </div>
          
          {/* Visual Progress Bar */}
          <div className="h-[3px] w-full bg-primary/10 relative overflow-hidden border-x border-primary/20">
            <div 
              className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(139,77,242,0.8)] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 w-8 h-full bg-white/40 blur-sm"></div>
            </div>
          </div>
        </div>

        {/* Tactical Logs */}
        <div className="border-l border-primary/20 pl-4 py-3 space-y-2 bg-primary/[0.03] backdrop-blur-sm">
          <p className="text-[9px] text-muted-foreground/60 uppercase leading-none tracking-wider">
            {progress > 10 && "> Tunneling_Bypass_v1.0.4"}
          </p>
          <p className="text-[9px] text-muted-foreground/60 uppercase leading-none tracking-wider">
            {progress > 40 && "> Injecting_DedSec_Runtime..."}
          </p>
          <p className="text-[9px] text-muted-foreground/60 uppercase leading-none tracking-wider">
            {progress > 70 && "> Accessing_Core_Memory_Node..."}
          </p>
          <p className="text-[10px] text-primary font-bold uppercase leading-none animate-pulse tracking-widest">
            {progress > 90 && ">> ACCESS_GRANTED. WELCOME_RETR0."}
          </p>
        </div>
      </div>

      {/* Frame Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-primary/30 opacity-40"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-primary/30 opacity-40"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-primary/30 opacity-40"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-primary/30 opacity-40"></div>
    </div>
  )
}
