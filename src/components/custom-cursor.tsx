"use client"

import React, { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // High-precision tracking using motion values for performance
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Lagging springs for the "Neural Interface" effect
  const springConfig = { stiffness: 250, damping: 20, mass: 0.5 }
  const lagX = useSpring(mouseX, springConfig)
  const lagY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
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

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference overflow-hidden">
      {/* Primary Tactical Crosshair */}
      <motion.div 
        className="absolute w-8 h-8 flex items-center justify-center"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
      >
        <motion.div 
          className="relative w-full h-full flex items-center justify-center"
          animate={{
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? 90 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* HUD Corner Brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
          
          {/* Central Point */}
          <motion.div 
            className="w-1 h-1 bg-primary rounded-full"
            animate={{ 
              scale: isClicked ? 4 : 1,
              opacity: isClicked ? 0.5 : 1 
            }}
          />
        </motion.div>
      </motion.div>

      {/* Neural Interface Lag Ring */}
      <motion.div 
        className="absolute w-12 h-12 border border-primary/30 rounded-full"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 0.8 : 1.2,
          opacity: isHovering ? 1 : 0.4,
          borderWidth: isHovering ? "2px" : "1px"
        }}
      />

      {/* Interaction Tag */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 35, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            className="absolute font-code text-[7px] text-primary tracking-[0.2em] font-bold"
            style={{
              x: mouseX,
              y: mouseY,
              translateY: "-50%"
            }}
          >
            [INTERACT_READY]
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanline Sweep (Occasional Visual Glitch) */}
      <motion.div 
        className="absolute h-[1px] w-4 bg-primary/20"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: [0, 100, 0],
          opacity: [0, 0.5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 5
        }}
      />
    </div>
  )
}
