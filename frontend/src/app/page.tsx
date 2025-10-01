"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center"
    >
      <div className="max-w-2xl bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10">
        <h1 className="text-5xl font-extrabold text-pink-600 mb-4">
          Adopte ton futur compagnon 🐕🐈🐇
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Generative Pets t’aide à trouver l’animal idéal selon ton mode de vie,
          ton espace, et tes préférences ❤️
        </p>

        <Link
          href="/chat"
          className="inline-block px-8 py-4 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Commencer la discussion 💬
        </Link>
      </div>

      <footer className="mt-10 text-gray-400 text-sm">
        © {new Date().getFullYear()} Generative Pets — Avec amour et IA 🧠
      </footer>
    </motion.section>
  )
}
