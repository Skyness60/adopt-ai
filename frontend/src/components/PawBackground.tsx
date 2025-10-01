"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Paw {
  id: number
  x: number
  y: number
  rotation: number
}

export default function PawBackground() {
  const [paws, setPaws] = useState<Paw[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newPaw: Paw = {
        id: Date.now(),
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
      }

      setPaws((prev) => [...prev, newPaw])

      setTimeout(() => {
        setPaws((prev) => prev.filter((p) => p.id !== newPaw.id))
      }, 6000)
    }, 700)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {paws.map((paw) => (
        <motion.div
          key={paw.id}
          initial={{ opacity: 0, scale: 0.4, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.4, 1, 1, 1],
            y: [20, 0, 0, -10],
          }}
          transition={{ duration: 5, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: paw.x,
            top: paw.y,
            rotate: paw.rotation,
          }}
          className="text-3xl md:text-4xl text-amber-800/20 select-none"
        >
          🐾
        </motion.div>
      ))}
    </div>
  )
}
