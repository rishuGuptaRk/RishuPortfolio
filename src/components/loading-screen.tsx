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
    <div className="fixed inset-0 z-[200] bg-[#060606] flex flex-col items-center justify-center p-8 font-code overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-grid-primary"></div>
      
      <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
        <motion.div
          animate={{
            boxShadow: ["0 0 0px var(--primary)", "0 0 40px var(--primary)", "0 0 0px var(--primary)"],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 border border-primary/20 rounded-full"
        />
        <Image 
          src="/images/hacking watch dogs GIF.gif" 
          alt="Infiltration" 
          width={200}
          height={200}
          className="object-contain grayscale brightness-125" 
          unoptimized 
        />
      </div>
      
      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-primary text-[10px] uppercase font-bold tracking-[0.3em] animate-pulse">
              SYSTEM_INFILTRATION_IN_PROGRESS
            </span>
            <span className="text-primary/40 text-[8px] font-mono">
              USER_ID: DEDSEC_GUEST // NODE: SF_041
            </span>
          </div>
          <span className="text-primary font-headline text-3xl tabular-nums">{progress}%</span>
        </div>

        <div className="h-2 w-full bg-white/5 border border-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] w-20 animate-[slide_1.5s_infinite]" />
        </div>

        <div className="h-24 overflow-hidden border-l border-primary/20 pl-4 space-y-1">
          <AnimatePresence mode="popLayout">
            {logs.slice(-4).map((log, i) => (
              <motion.div
                key={log}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-[10px] text-primary font-mono uppercase tracking-tighter flex items-center gap-2"
              >
                <span className="text-primary/40">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className={i === logs.slice(-4).length - 1 ? "text-primary" : "text-primary/40"}>
                  {i === logs.slice(-4).length - 1 ? "> " : "  "} {log}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </div>
  )
}