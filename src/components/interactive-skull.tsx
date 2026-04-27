
"use client"

import React, { useState, useEffect } from "react"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export const InteractiveSkull = () => {
  const [isLaughing, setIsLaughing] = useState(false)
  const skullImg = PlaceHolderImages.find(img => img.id === "dedsec-skull")
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for tracking
  const springConfig = { damping: 30, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Map mouse position to limited 3D rotation
  const rotateX = useTransform(y, [-500, 500], [15, -15])
  const rotateY = useTransform(x, [-500, 500], [-15, 15])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const centerX = innerWidth / 2
      const centerY = innerHeight / 2
      // Normalize position relative to center
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const triggerLaugh = () => {
    if (isLaughing) return
    setIsLaughing(true)
    setTimeout(() => setIsLaughing(false), 2000)
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <div className="relative w-[400px] h-[400px] md:w-[700px] md:h-[700px] pointer-events-auto cursor-pointer" onClick={triggerLaugh}>
        <motion.div
          style={{
            rotateX,
            rotateY,
            perspective: 1200,
            transformStyle: "preserve-3d"
          }}
          animate={isLaughing ? {
            scale: [1, 1.1, 0.9, 1.15, 1],
            rotate: [0, 2, -2, 2, 0],
            filter: ["brightness(0.5) contrast(1)", "brightness(2) contrast(2)", "brightness(0.8) contrast(1.5)", "brightness(2.5) contrast(3)", "brightness(0.5) contrast(1)"],
          } : {
            scale: 1,
            rotate: 0,
            filter: "brightness(0.5) contrast(1)"
          }}
          transition={isLaughing ? { 
            duration: 0.15, 
            repeat: 12,
            repeatType: "reverse"
          } : { 
            duration: 0.5 
          }}
          className="w-full h-full relative"
        >
          {skullImg && (
            <Image
              src={skullImg.imageUrl}
              alt="DedSec System Core"
              fill
              className={`object-contain transition-all duration-500 ${isLaughing ? 'opacity-100 grayscale-0' : 'opacity-20 grayscale'}`}
              unoptimized
            />
          )}
          
          {/* Neural Glitch FX during laugh */}
          {isLaughing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              className="absolute inset-0 bg-primary/30 mix-blend-color-dodge rounded-full blur-3xl"
            />
          )}
        </motion.div>

        {/* Tactical UI markers */}
        <div className="absolute inset-0 border border-primary/5 rounded-full animate-[spin_60s_linear_infinite] scale-110 pointer-events-none"></div>
        <div className="absolute inset-0 border border-accent/10 rounded-full animate-[spin_30s_linear_infinite_reverse] scale-125 pointer-events-none"></div>
      </div>
    </div>
  )
}
