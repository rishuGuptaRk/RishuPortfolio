
"use client"

import React, { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  
  // High-precision tracking
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Lagging springs for the "Neural Interface" effect
  const springConfig = { stiffness: 250, damping: 25, mass: 0.5 }
  const lagX = useSpring(mouseX, springConfig)
  const lagY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setCoords({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, textarea, [role="button"], .interactive')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Primary HUD Readout (Position & Status) */}
      <motion.div 
        className="absolute flex flex-col gap-1 pointer-events-none"
        style={{
          x: lagX,
          y: lagY,
          translateX: 40,
          translateY: 20
        }}
      >
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[9px] font-code text-primary font-bold uppercase tracking-tighter">POS:</span>
          <span className="text-[9px] font-code text-accent font-bold tabular-nums">
            {Math.round(coords.x)}x{Math.round(coords.y)}
          </span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[9px] font-code text-primary font-bold uppercase tracking-tighter">STATUS:</span>
          <span className={`text-[9px] font-code font-black uppercase tracking-widest ${isHovering ? 'text-white' : 'text-emerald-500'} animate-pulse`}>
            {isHovering ? "[TARGET_LOCKED]" : "INFILTRATING"}
          </span>
        </div>
        <div className="w-16 h-[1px] bg-primary/40 mt-1" />
      </motion.div>

      {/* The Central Cyan Point */}
      <motion.div 
        className="absolute w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(0,255,255,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />

      {/* Interactive Box & Brackets */}
      <motion.div 
        className="absolute w-12 h-12 border border-primary/20"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? 45 : 0
        }}
      >
        {/* Corner Brackets */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-accent" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-accent" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent" />
      </motion.div>

      {/* Large Perimeter Scanning Ring */}
      <motion.div 
        className="absolute w-40 h-40 border border-primary/10 rounded-full"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 0.8 : 1,
          borderColor: isHovering ? "rgba(0, 255, 255, 0.3)" : "rgba(139, 92, 246, 0.1)"
        }}
      />

      {/* Decorative Cyan Bars on the Perimeter */}
      <motion.div
        className="absolute"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-4 h-1 bg-accent/40" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-1 bg-accent/40" />
      </motion.div>
    </div>
  )
}
