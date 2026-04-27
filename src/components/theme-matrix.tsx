"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const themes = [
  { id: "default", color: "bg-cyan-500", label: "CYAN_OVERRIDE" },
  { id: "emerald", color: "bg-emerald-500", label: "EMERALD_GREEN" },
  { id: "amber", color: "bg-yellow-500", label: "AMBER_CORE" },
  { id: "crimson", color: "bg-rose-500", label: "CRIMSON_BREACH" },
]

export const ThemeMatrix = () => {
  const [activeTheme, setActiveTheme] = useState("default")

  useEffect(() => {
    const root = document.documentElement
    if (activeTheme === "default") {
      root.removeAttribute("data-theme")
    } else {
      root.setAttribute("data-theme", activeTheme)
    }
  }, [activeTheme])

  return (
    <div className="flex items-center gap-3 bg-black/40 p-2 border border-white/10 backdrop-blur-md">
      <span className="text-[8px] font-code text-primary/60 uppercase tracking-widest mr-1">PALETTE:</span>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTheme(t.id)}
          className={cn(
            "w-3 h-3 transition-all duration-300 relative group rounded-full",
            t.color,
            activeTheme === t.id ? "ring-1 ring-white ring-offset-2 ring-offset-background scale-110" : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
          )}
          title={t.label}
        >
          {activeTheme === t.id && (
            <motion.div 
              layoutId="theme-ring"
              className="absolute -inset-1 border border-primary/40 rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  )
}