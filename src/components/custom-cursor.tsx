"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 250 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
    setCoords({ x: e.clientX, y: e.clientY })
    if (!isVisible) setIsVisible(true)
  }, [mouseX, mouseY, isVisible])

  useEffect(() => {
    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('type') === 'submit'
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("mouseover", onMouseOver)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("mouseover", onMouseOver)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
    }
  }, [onMouseMove])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] mix-blend-difference overflow-hidden">
      {/* Primary HUD Container */}
      <div 
        className="absolute top-0 left-0 transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${coords.x}px, ${coords.y}px)` 
        }}
      >
        {/* Outer Rotating Ring */}
        <div 
          className={`absolute -translate-x-1/2 -translate-y-1/2 border border-primary/20 rounded-full transition-all duration-500 ease-out flex items-center justify-center ${isHovering ? 'w-24 h-24 rotate-180' : 'w-16 h-16 rotate-0'}`}
          style={{ animation: 'spin 12s linear infinite' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-accent"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-accent"></div>
        </div>

        {/* Inner Glitch Reticle */}
        <div 
          className={`absolute -translate-x-1/2 -translate-y-1/2 border border-primary transition-all duration-300 ${isHovering ? 'w-10 h-10 scale-125' : 'w-6 h-6 scale-100'} ${isClicking ? 'scale-75' : ''}`}
        >
          {/* HUD Corners */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent"></div>
          
          {/* Scanning Lines */}
          {isHovering && (
            <div className="absolute inset-0 overflow-hidden opacity-50">
              <div className="w-full h-[1px] bg-primary animate-[scanline_1s_linear_infinite]"></div>
            </div>
          )}
        </div>

        {/* Data Readout Overlay */}
        <div className={`absolute top-8 left-8 flex flex-col gap-1 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-40'}`}>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-code text-primary uppercase tracking-tighter">POS:</span>
            <span className="text-[8px] font-code text-accent tracking-tighter tabular-nums">
              {Math.round(coords.x)}x{Math.round(coords.y)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-code text-primary uppercase tracking-tighter">STATUS:</span>
            <span className="text-[8px] font-code text-green-500 tracking-tighter animate-pulse uppercase">
              {isHovering ? 'INFILTRATING' : 'SCANNING'}
            </span>
          </div>
          {isHovering && (
             <div className="h-0.5 w-16 bg-primary/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full bg-primary animate-[progress_1.5s_ease-in-out_infinite]"></div>
             </div>
          )}
        </div>

        {/* Center Target Dot */}
        <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full transition-transform duration-200 ${isClicking ? 'scale-0' : 'scale-100'}`} />
      </div>

      {/* Trailing Ghost Effect */}
      <div 
        className="absolute top-0 left-0 w-8 h-8 border border-primary/10 transition-all duration-300 pointer-events-none opacity-20"
        style={{ 
          transform: `translate(${coords.x}px, ${coords.y}px) translate(-50%, -50%)`,
          transition: 'transform 0.2s cubic-bezier(0.1, 0, 0, 1)'
        }}
      />

      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
