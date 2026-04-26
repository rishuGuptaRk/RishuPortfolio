
"use client"

import React, { useEffect, useState } from "react"

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button'
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
  }, [isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* HUD Reticle */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150 ease-out"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1}) ${isClicking ? 'scale(0.85)' : ''}` 
        }}
      >
        <div className="w-6 h-6 border border-primary/40 relative">
          {/* HUD Corners */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent"></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-accent"></div>
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-accent"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent"></div>
          
          {/* Inner details for active hover */}
          {isHovering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-full bg-primary/20 absolute"></div>
              <div className="w-full h-0.5 bg-primary/20 absolute"></div>
            </div>
          )}
        </div>
      </div>

      {/* Center Target Dot */}
      <div 
        className="fixed top-0 left-0 w-1 h-1 bg-accent pointer-events-none z-[10000] mix-blend-difference"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)` 
        }}
      />
    </>
  )
}
