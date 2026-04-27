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
    hidden: { 
      opacity: 0, 
      scale: 0.98,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.33, 1, 0.68, 1],
        staggerChildren: 0.15
      } 
    }
  }

  const borderVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={cn("relative border border-white/10 bg-black/60 backdrop-blur-xl p-4 md:p-8 group overflow-hidden", className)}
    >
      {/* Precision Corners (Animated) */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className={cn("absolute top-0 left-0 w-3 md:w-6 h-3 md:h-6 border-t-2 border-l-2 opacity-60 transition-all duration-300 group-hover:w-10 group-hover:h-10 group-hover:opacity-100", borderColor)}
      />
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className={cn("absolute top-0 right-0 w-3 md:w-6 h-3 md:h-6 border-t-2 border-r-2 opacity-60 transition-all duration-300 group-hover:w-10 group-hover:h-10 group-hover:opacity-100", borderColor)}
      />
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className={cn("absolute bottom-0 left-0 w-3 md:w-6 h-3 md:h-6 border-b-2 border-l-2 opacity-60 transition-all duration-300 group-hover:w-10 group-hover:h-10 group-hover:opacity-100", borderColor)}
      />
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className={cn("absolute bottom-0 right-0 w-3 md:w-6 h-3 md:h-6 border-b-2 border-r-2 opacity-60 transition-all duration-300 group-hover:w-10 group-hover:h-10 group-hover:opacity-100", borderColor)}
      />
      
      {title && (
        <motion.div variants={childVariants} className="mb-4 md:mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <motion.div 
              animate={{ height: [16, 24, 16] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={cn("w-1.5", variant === "accent" ? "bg-accent" : "bg-primary")} 
            />
            <h3 className={cn("text-[10px] md:text-[12px] font-code font-bold uppercase tracking-[0.3em] md:tracking-[0.5em]", titleColor)}>
              {title}
            </h3>
          </div>
          <div className="hidden xs:flex gap-1 md:gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 * i }}
                className={cn("w-1.5 h-1.5", i === 3 ? (variant === "accent" ? "bg-accent" : "bg-primary") : "bg-white/10")}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      <motion.div variants={childVariants} className="relative z-10">
        {children}
      </motion.div>

      {/* Interactive Scanline Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-grid-primary"></div>
      <motion.div 
        animate={{ translateY: ["0%", "1000%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-1 bg-primary/20 blur-sm pointer-events-none"
      />
    </motion.div>
  )
}
