"use client"

import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center"
    >
      <div className="max-w-2xl bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          À propos de Generative Pets 🐾
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          <b>Generative Pets</b> est une application d’aide à l’adoption
          d’animaux basée sur l’intelligence artificielle 🧠
          <br />
          <br />
          Notre mission est d’aider chaque personne à trouver le compagnon
          idéal selon son mode de vie, son espace et ses besoins 💛  
          <br />
          <br />
          Grâce à une approche bienveillante et personnalisée, nous
          souhaitons favoriser une <b>adoption responsable</b> et renforcer le
          lien entre humains et animaux 🐶🐱🐰
        </p>

        <div className="mt-8">
          <p className="text-sm text-gray-400">
            Projet développé avec ❤️ par un étudiant de 42 utilisant LM Studio &
            Next.js
          </p>
		  <p className="text-sm text-gray-700">
			Sami Perron
		  </p>
        </div>
      </div>
    </motion.section>
  )
}
