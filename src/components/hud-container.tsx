import React from "react"
import { cn } from "@/lib/utils"

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
    <div className={cn("relative border border-primary/20 bg-card/40 backdrop-blur-md p-6 group", className)}>
      {/* Precision Corners */}
      <div className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-all duration-300 group-hover:w-5 group-hover:h-5", borderColor)}></div>
      <div className={cn("absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 transition-all duration-300 group-hover:w-5 group-hover:h-5", borderColor)}></div>
      <div className={cn("absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 transition-all duration-300 group-hover:w-5 group-hover:h-5", borderColor)}></div>
      <div className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-all duration-300 group-hover:w-5 group-hover:h-5", borderColor)}></div>
      
      {/* Decorative Marks */}
      <div className="absolute top-1/2 -left-[1px] w-[1px] h-12 bg-primary/40 -translate-y-1/2"></div>
      <div className="absolute top-1/2 -right-[1px] w-[1px] h-12 bg-primary/40 -translate-y-1/2"></div>
      
      {title && (
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("h-4 w-1 animate-flicker", variant === "accent" ? "bg-accent" : "bg-primary")}></div>
            <h3 className={cn("text-[10px] font-code font-bold uppercase tracking-[0.2em]", titleColor)}>
              {title}
            </h3>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-primary/30"></div>
            <div className="w-1 h-1 bg-primary/60"></div>
            <div className="w-1 h-1 bg-primary"></div>
          </div>
        </div>
      )}
      
      <div className="relative z-10 font-body">
        {children}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(139,77,242,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,77,242,0.1)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
    </div>
  )
}