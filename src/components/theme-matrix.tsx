
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const themes = [
  { id: "amber", color: "bg-yellow-500", label: "AMBER_CORE" },
  { id: "emerald", color: "bg-emerald-500", label: "EMERALD_GREEN" },
  { id: "cyan", color: "bg-cyan-500", label: "CYAN_OVERRIDE" },
  { id: "crimson", color: "bg-rose-500", label: "CRIMSON_BREACH" },
]

export const ThemeMatrix = () => {
  const [activeTheme, setActiveTheme] = useState("amber")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeTheme === "amber" ? "" : activeTheme)
  }, [activeTheme])

  return (
    <div className="flex items-center gap-3 bg-black/40 p-1.5 border border-white/5">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTheme(t.id)}
          className={cn(
            "w-4 h-4 transition-all duration-300 relative group",
            t.color,
            activeTheme === t.id ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-background" : "opacity-30 grayscale hover:opacity-100 hover:grayscale-0"
          )}
          title={t.label}
        >
          {activeTheme === t.id && (
            <motion.div 
              layoutId="theme-ring"
              className="absolute -inset-1 border border-white opacity-40"
            />
          )}
        </button>
      ))}
    </div>
  )
}
