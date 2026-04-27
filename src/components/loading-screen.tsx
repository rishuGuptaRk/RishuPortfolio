
"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const HACKING_LOGS = [
  "INFILTRATING_LOCAL_NODE...",
  "BYPASSING_FIREWALL_v4.2...",
  "EXTRACTING_ENCRYPTED_DATA...",
  "ESTABLISHING_SECURE_UPLINK...",
  "DECRYPTING_OPERATIVE_FILES...",
  "SYNCHRONIZING_SYSTEM_MODULES...",
  "GRANTING_ADMIN_ACCESS...",
  "CLEANING_TRACES...",
  "CONNECTION_STABLE.",
]

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 1000)
          return 100
        }
        const step = Math.floor(Math.random() * 8) + 2
        return Math.min(prev + step, 100)
      })
    }, 120)

    return () => clearInterval(timer)
  }, [onComplete])

  useEffect(() => {
    const logIndex = Math.floor((progress / 100) * HACKING_LOGS.length)
    if (logIndex < HACKING_LOGS.length && logs.indexOf(HACKING_LOGS[logIndex]) === -1) {
      setLogs(prev => [...prev, HACKING_LOGS[logIndex]])
    }
  }, [progress, logs])

  return (
    <div className="fixed inset-0 z-[200] bg-[#060606] flex flex-col items-center justify-center p-6 md:p-8 font-code overflow-hidden">
      {/* Background UI Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grid-primary"></div>
      
      {/* GIF Container */}
      <div className="relative w-48 h-48 md:w-72 md:h-72 mb-8 md:mb-12 flex items-center justify-center overflow-visible">
        <Image 
          src="/images/hacking watch dogs GIF.gif" 
          alt="Infiltration" 
          width={280}
          height={280}
          className="object-contain grayscale brightness-110 contrast-125 mix-blend-screen" 
          unoptimized 
        />
      </div>
      
      <div className="w-full max-w-[90vw] md:max-w-md space-y-4 md:space-y-6 relative z-10">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-primary text-[8px] md:text-[10px] uppercase font-bold tracking-[0.4em] animate-pulse">
              SYSTEM_INFILTRATION
            </span>
            <span className="text-primary/40 text-[7px] md:text-[8px] font-mono mt-1">
              NODE: SF_041
            </span>
          </div>
          <span className="text-primary font-headline text-xl md:text-3xl tabular-nums tracking-tighter">{progress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 md:h-1.5 w-full bg-white/5 border border-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] w-24 animate-[slide_2s_infinite]" />
        </div>

        {/* Terminal Logs */}
        <div className="h-20 md:h-28 overflow-hidden border-l border-primary/20 pl-4 md:pl-5 space-y-1">
          <AnimatePresence mode="popLayout">
            {logs.slice(-3).map((log, i) => (
              <motion.div
                key={log}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-[9px] md:text-[10px] text-primary font-mono uppercase tracking-tight flex items-center gap-2 md:gap-3"
              >
                <span className="text-primary/30 hidden xs:inline min-w-[60px] md:min-w-[70px]">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className={i === logs.slice(-3).length - 1 ? "text-primary font-bold" : "text-primary/40"}>
                  {i === logs.slice(-3).length - 1 ? ">> " : "   "} {log}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(600%); }
        }
      `}</style>
    </div>
  )
}
