"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  variant?: "hacked" | "orbitron"
}

export const GlitchText = ({ 
  text, 
  className, 
  as: Component = "span",
  variant = "hacked"
}: GlitchTextProps) => {
  return (
    <Component 
      className={cn(
        "glitch-text uppercase tracking-wider", 
        variant === "hacked" ? "font-hacked" : "font-headline",
        className
      )} 
      data-text={text}
    >
      {text}
    </Component>
  )
}
