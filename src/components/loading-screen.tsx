"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { GlitchText } from "./glitch-text"

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState("")

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
          setTimeout(onComplete, 1000) // Brief pause at 100% for impact
          return 100
        }
        // Random increments for a "crunchy" feel
        const jump = Math.floor(Math.random() * 15) + 2
        return Math.min(prev + jump, 100)
      })
    }, 180)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  const barCount = 20
  const filledCount = Math.floor((progress / 100) * barCount)
  const barString = "[" + "#".repeat(filledCount) + "-".repeat(barCount - filledCount) + "]"

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Glitch Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,rgba(139,77,242,0.15)_0%,transparent_70%)]"></div>

      {/* Centered Glitch GIF */}
      <div className="relative w-64 h-32 mb-12 flex items-center justify-center">
        <Image 
          src="/r4.gif" 
          alt="System Breach" 
          fill 
          className="object-contain grayscale invert contrast-200"
          priority
        />
        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full animate-pulse"></div>
      </div>
      
      {/* Progress HUD */}
      <div className="w-full max-w-sm space-y-6 relative z-10">
        <div className="space-y-3">
          <div className="flex justify-between items-end font-code text-[10px]">
            <div className="flex flex-col">
              <span className="text-primary tracking-[0.2em] uppercase">Status: Infiltrating_Network{dots}</span>
              <span className="text-muted-foreground/30 mt-1">Uplink: SF-NODE-415-STABLE</span>
            </div>
            <div className="text-right">
              <span className="text-primary text-sm font-headline tracking-tighter">{progress}%</span>
            </div>
          </div>
          
          {/* DedSec Bracketed Text Bar */}
          <div className="font-code text-[11px] text-primary/80 tracking-widest leading-none break-all text-center">
            {barString}
          </div>
          
          {/* Visual Progress Bar */}
          <div className="h-[2px] w-full bg-primary/10 relative overflow-hidden border-x border-primary/30">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 w-4 h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"></div>
            </div>
          </div>
        </div>

        {/* Tactical Logs */}
        <div className="border-l-2 border-primary/20 pl-4 py-2 space-y-1 bg-primary/[0.02]">
          <p className="text-[9px] font-code text-muted-foreground/40 uppercase leading-none">
            {progress > 5 && "> Establishing_Encrypted_Tunnel..."}
          </p>
          <p className="text-[9px] font-code text-muted-foreground/40 uppercase leading-none">
            {progress > 35 && "> Bypassing_CTOS_Firewall_V3..."}
          </p>
          <p className="text-[9px] font-code text-muted-foreground/40 uppercase leading-none">
            {progress > 65 && "> Extracting_Subject_Dossier..."}
          </p>
          <p className="text-[9px] font-code text-primary/70 uppercase leading-none animate-flicker">
            {progress > 90 && "> ACCESS_GRANTED. WELCOME_RETR0."}
          </p>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-primary/20 opacity-50"></div>
      <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-primary/20 opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-primary/20 opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-primary/20 opacity-50"></div>
      
      <div className="absolute bottom-12 left-12 hidden md:block opacity-20">
         <div className="text-[8px] font-code text-primary leading-tight">
           DECRYPT_SIG: 0x8F2A...<br/>
           SECTOR: SF_GRID_7<br/>
           SIGNAL: -42dBm
         </div>
      </div>
    </div>
  )
}
