
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      } 
    }
  }

  const childVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className={cn("relative border border-white/10 bg-black/40 backdrop-blur-md p-4 md:p-8 group overflow-hidden", className)}
    >
      {/* Precision Corners */}
      <div className={cn("absolute top-0 left-0 w-3 md:w-4 h-3 md:h-4 border-t border-l opacity-40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:opacity-100", borderColor)}></div>
      <div className={cn("absolute top-0 right-0 w-3 md:w-4 h-3 md:h-4 border-t border-r opacity-40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:opacity-100", borderColor)}></div>
      <div className={cn("absolute bottom-0 left-0 w-3 md:w-4 h-3 md:h-4 border-b border-l opacity-40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:opacity-100", borderColor)}></div>
      <div className={cn("absolute bottom-0 right-0 w-3 md:w-4 h-3 md:h-4 border-b border-r opacity-40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:opacity-100", borderColor)}></div>
      
      {title && (
        <motion.div variants={childVariants} className="mb-4 md:mb-8 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className={cn("h-4 w-1 animate-flicker", variant === "accent" ? "bg-accent" : "bg-primary")}></div>
            <h3 className={cn("text-[9px] md:text-[10px] font-code font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]", titleColor)}>
              {title}
            </h3>
          </div>
          <div className="hidden xs:flex gap-1 md:gap-2">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary/20"></div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary/40"></div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-primary"></div>
          </div>
        </motion.div>
      )}
      
      <motion.div variants={childVariants} className="relative z-10">
        {children}
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
    </motion.div>
  )
}
