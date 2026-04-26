import React from "react"
import { cn } from "@/lib/utils"

interface HudContainerProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export const HudContainer = ({ children, title, className }: HudContainerProps) => {
  return (
    <div className={cn("relative border border-primary/30 bg-card/50 backdrop-blur-sm p-6 group overflow-hidden", className)}>
      {/* Corner Elements */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary group-hover:scale-110 transition-transform"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary group-hover:scale-110 transition-transform"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary group-hover:scale-110 transition-transform"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary group-hover:scale-110 transition-transform"></div>
      
      {title && (
        <div className="mb-4 flex items-center gap-2">
          <div className="h-4 w-1 bg-primary animate-pulse"></div>
          <h3 className="text-xs font-code font-bold uppercase tracking-widest text-primary/80">
            {title}
          </h3>
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(139,77,242,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,77,242,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
    </div>
  )
}