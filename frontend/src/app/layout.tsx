import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar"
import PawBackground from "@/components/PawBackground"

export const metadata: Metadata = {
  title: "Generative Pets",
  description: "Ton conseiller intelligent pour adopter ton futur compagnon 🐶🐱",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="relative min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50 text-gray-800 overflow-x-hidden">
        <PawBackground />
        <div className="relative z-10">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
