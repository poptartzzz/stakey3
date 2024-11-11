'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function PromoBanner() {
  // Bright, visible colors only
  const colors = [
    '#CB6CE6', // Purple
    '#63e211', // Green
    '#ff6666', // Red
    '#00ffff', // Cyan
    '#ff00ff', // Magenta
    '#ff1493'  // Pink
  ]
  
  const [colorIndex, setColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length)
    }, 150) // Change color every 150ms for fast flashing

    return () => clearInterval(interval)
  }, [colors.length]) // Added colors.length as dependency

  return (
    <div className="w-full bg-[#CB6CE6] text-white overflow-hidden">
      <motion.div 
        className="container flex items-center justify-center h-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-4 w-4" style={{ color: colors[(colorIndex + 2) % colors.length] }} />
          </motion.div>
          <span 
            className="text-xs font-press-start-2p transition-colors duration-100"
            style={{ color: colors[colorIndex] }}
          >
            STAKEY Official Launch on PUMP.FUN - November 12th, 2024
          </span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-4 w-4" style={{ color: colors[(colorIndex + 2) % colors.length] }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
} 