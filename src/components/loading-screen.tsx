
"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
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
          setTimeout(onComplete, 1500) // Slightly longer pause for impact
          return 100
        }
        // Random increments for a "crunchy" feel
        const jump = Math.floor(Math.random() * 15) + 5
        return Math.min(prev + jump, 100)
      })
    }, 180)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  const barWidth = 30
  const filledCount = Math.floor((progress / 100) * barWidth)
  const barString = "[" + "#".repeat(filledCount) + "-".repeat(barWidth - filledCount) + "]"

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 select-none overflow-hidden font-code">
      {/* Centered GIF container */}
      <div className="relative w-full max-w-md h-64 mb-12 flex items-center justify-center">
        {heroGif?.imageUrl && (
          <Image 
            src={heroGif.imageUrl} 
            alt="System Infiltration" 
            fill 
            className="object-contain grayscale contrast-125 brightness-110"
            priority
            unoptimized
          />
        )}
        {/* Glow effect behind GIF */}
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full animate-pulse -z-10"></div>
      </div>
      
      {/* Progress HUD */}
      <div className="w-full max-w-sm space-y-6 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <div className="flex flex-col">
              <span className="text-primary text-[10px] tracking-[0.3em] uppercase font-bold">
                ESTABLISHING_UPLINK{dots}
              </span>
              <span className="text-muted-foreground/30 text-[8px] mt-1 tracking-widest uppercase">
                SF_NODE_415_CONNECTED
              </span>
            </div>
            <div className="text-right">
              <span className="text-primary text-2xl font-headline tracking-tighter">
                {progress}%
              </span>
            </div>
          </div>
          
          {/* DedSec Bracketed Visual Bar */}
          <div className="text-[12px] text-primary/80 tracking-[0.2em] leading-none text-center font-bold font-code overflow-hidden whitespace-nowrap">
            {barString}
          </div>
          
          {/* Underline Progress Bar */}
          <div className="h-[2px] w-full bg-primary/10 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(139,77,242,0.8)] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 w-4 h-full bg-white/30 blur-sm"></div>
            </div>
          </div>
        </div>

        {/* Tactical Logs */}
        <div className="border-l border-primary/20 pl-4 py-2 space-y-1 bg-primary/[0.02]">
          <p className="text-[8px] text-muted-foreground/50 uppercase tracking-wider">
            {progress > 10 && "> Tunneling_Bypass_v2.0"}
          </p>
          <p className="text-[8px] text-muted-foreground/50 uppercase tracking-wider">
            {progress > 40 && "> Injecting_DedSec_Core..."}
          </p>
          <p className="text-[8px] text-muted-foreground/50 uppercase tracking-wider">
            {progress > 75 && "> Bypassing_Firewall_Node..."}
          </p>
          <p className="text-[9px] text-primary font-bold uppercase animate-pulse tracking-widest">
            {progress > 90 && ">> ACCESS_GRANTED. WELCOME_RETR0."}
          </p>
        </div>
      </div>

      {/* Aesthetic Border Corners */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-primary/20"></div>
      <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-primary/20"></div>
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-primary/20"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-primary/20"></div>
    </div>
  )
}
