"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 15) + 5
      })
    }, 150)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[200] bg-[#060606] flex flex-col items-center justify-center p-8 font-code">
      <div className="relative w-48 h-48 mb-8 overflow-hidden">
        <Image 
          src="/images/hacking watch dogs GIF.gif" 
          alt="Loading..." 
          fill 
          className="object-contain" 
          unoptimized 
        />
      </div>
      
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-between items-end">
          <span className="text-primary text-[10px] uppercase font-bold tracking-widest">
            INFILTRATING_SYSTEM...
          </span>
          <span className="text-primary font-headline text-xl">{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 relative">
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-[8px] text-muted-foreground/40 uppercase tracking-tighter">
          NODE_ACCESS: GRANTED // BYPASSING_FIREWALL...
        </div>
      </div>
    </div>
  )
}