"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('button, a, input, textarea')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePos.x - 16,
        y: mousePos.y - 16,
        scale: isHovering ? 1.5 : 1
      }}
      transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="w-full h-full border border-primary relative flex items-center justify-center">
        <div className="w-1 h-1 bg-accent rounded-full" />
        <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white" />
        <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white" />
      </div>
    </motion.div>
  )
}