
"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion"

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  
  // High-precision tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Lagging spring for the "Trailing Focus" effect
  const lagX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.1 })
  const lagY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.1 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, textarea, [role="button"]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Primary HUD Crosshair */}
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference"
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
            scale: isHovering ? 1.4 : 1,
            rotate: isHovering ? 90 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Tactical Corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
          
          {/* Center Point */}
          <motion.div 
            className="w-1 h-1 bg-primary"
            animate={{ scale: isClicked ? 3 : 1 }}
          />
        </motion.div>
      </motion.div>

      {/* Lagging Focus Ring (Neural Lag) */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 border border-primary/40 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: lagX,
          y: lagY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovering ? 0.8 : 1.2,
          opacity: isHovering ? 0.8 : 0.3
        }}
      />

      {/* Hover Status Display */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 30 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed pointer-events-none z-[9999] font-code text-[8px] text-primary mix-blend-difference"
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
    </>
  )
}
