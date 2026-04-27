"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface HudContainerProps {
  children: React.ReactNode
  title?: string
  className?: string
  variant?: "default" | "accent"
}

export const HudContainer = ({ children, title, className, variant = "default" }: HudContainerProps) => {
  const borderColor = variant === "accent" ? "border-accent" : "border-primary"
  const titleColor = variant === "accent" ? "text-accent" : "text-primary"

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("relative border border-white/10 bg-black/40 backdrop-blur-md p-8 group overflow-hidden", className)}
    >
      {/* Precision Corners */}
      <div className={cn("absolute top-0 left-0 w-4 h-4 border-t border-l opacity-40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:opacity-100", borderColor)}></div>
      <div className={cn("absolute top-0 right-0 w-4 h-4 border-t border-r opacity-40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:opacity-100", borderColor)}></div>
      <div className={cn("absolute bottom-0 left-0 w-4 h-4 border-b border-l opacity-40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:opacity-100", borderColor)}></div>
      <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b border-r opacity-40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:opacity-100", borderColor)}></div>
      
      {title && (
        <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className={cn("h-4 w-1 animate-flicker", variant === "accent" ? "bg-accent" : "bg-primary")}></div>
            <h3 className={cn("text-[10px] font-code font-bold uppercase tracking-[0.3em]", titleColor)}>
              {title}
            </h3>
          </div>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 bg-primary/20"></div>
            <div className="w-1.5 h-1.5 bg-primary/40"></div>
            <div className="w-1.5 h-1.5 bg-primary"></div>
          </div>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
    </motion.div>
  )
}
