"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { v4 as uuidv4 } from "uuid"

interface Message {
  role: "user" | "assistant"
  content: string
  image?: string
}

interface Chat {
  id: string
  name: string
  messages: Message[]
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string>("")
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const MODEL = process.env.NEXT_PUBLIC_LMSTUDIO_MODEL

  useEffect(() => {
    const stored = localStorage.getItem("chats")
    if (stored) {
      const parsed = JSON.parse(stored)
      setChats(parsed)
      setActiveChatId(parsed[0]?.id || "")
    } else {
      const defaultChat = { id: uuidv4(), name: "Discussion 1", messages: [] }
      setChats([defaultChat])
      setActiveChatId(defaultChat.id)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats))
  }, [chats])

  const activeChat = chats.find((c) => c.id === activeChatId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat?.messages, loading])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !image) return
    if (!activeChat) return

    const userMessage: Message = { role: "user", content: input, image: image ?? undefined }
    const updatedMessages = [...activeChat.messages, userMessage]
    updateChat(activeChat.id, updatedMessages)
    setInput("")
    setImage(null)
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages: updatedMessages,
          temperature: 0.8,
        }),
      })

      const data = await res.json()

      if (!data.choices || (!data.choices[0]?.text && !data.choices[0]?.message)) {
        throw new Error("Réponse invalide du modèle.")
      }

      const aiMessage: Message = {
        role: "assistant",
        content: data.choices[0].text || data.choices[0].message?.content || "⚠️ Pas de réponse du modèle.",
      }

      updateChat(activeChat.id, [...updatedMessages, aiMessage])
    } catch (err) {
      console.error("Erreur IA :", err)
      alert("❌ Impossible de contacter ton IA locale (LLaVA / Phi).")
    } finally {
      setLoading(false)
    }
  }

  const updateChat = (chatId: string, messages: Message[]) =>
    setChats((prev) => prev.map((c) => (c.id === chatId ? { ...c, messages } : c)))

  const createChat = () => {
    const newChat: Chat = { id: uuidv4(), name: `Discussion ${chats.length + 1}`, messages: [] }
    setChats([...chats, newChat])
    setActiveChatId(newChat.id)
  }

  const resetAll = () => {
    if (confirm("Voulez-vous tout réinitialiser ? 🧹")) {
      localStorage.removeItem("chats")
      const defaultChat = { id: uuidv4(), name: "Nouvelle discussion", messages: [] }
      setChats([defaultChat])
      setActiveChatId(defaultChat.id)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1]
      setImage(base64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen w-full bg-gradient-to-br from-pink-50 to-blue-50 p-4"
    >
      <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-pink-100 rounded-3xl shadow-lg p-4 flex flex-col">
        <h2 className="text-lg font-bold text-pink-600 mb-3">💬 Conversations</h2>
        <div className="flex-1 overflow-y-auto space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={`p-2 rounded-lg cursor-pointer transition ${
                chat.id === activeChatId ? "bg-pink-100 font-semibold" : "hover:bg-gray-100"
              }`}
            >
              {chat.name}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <button onClick={createChat} className="bg-pink-400 text-white py-2 rounded-lg shadow hover:bg-pink-500 transition">
            ➕ Nouvelle discussion
          </button>
          <button onClick={resetAll} className="bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">
            🔄 Réinitialiser tout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-pink-100 p-5 flex flex-col h-[80vh]">
          <h1 className="text-2xl font-bold text-pink-600 mb-3 text-center">🐾 Ton conseiller Generative Pets</h1>

          <div className="flex-1 overflow-y-auto mb-3 p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-green-50">
            {activeChat?.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-2 my-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl shadow-sm text-sm leading-relaxed prose prose-sm ${
                    msg.role === "user" ? "bg-blue-100 text-gray-800 rounded-tr-none" : "bg-green-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  {msg.image && (
                    <img
                      src={`data:image/png;base64,${msg.image}`}
                      alt="image envoyée"
                      className="mt-2 rounded-lg max-h-40 object-cover border border-gray-200"
                    />
                  )}
                </div>
              </motion.div>
            ))}
            {loading && <p className="text-gray-400 italic text-center mt-2">🐾 Generative Pets réfléchit... 💭</p>}
            <div ref={messagesEndRef} />
          </div>

          {image && (
            <div className="mb-2 flex justify-center">
              <img src={`data:image/png;base64,${image}`} alt="Prévisualisation" className="max-h-32 rounded-xl border border-gray-300 shadow" />
            </div>
          )}

          <form onSubmit={sendMessage} className="flex gap-2 items-center bg-white/90 rounded-full p-2 border border-gray-200 shadow-inner">
            <label className="cursor-pointer text-pink-500 px-2">
              📎
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <input
              type="text"
              placeholder="Parle à ton conseiller..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border-none bg-transparent p-2 px-3 text-sm focus:outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-full shadow hover:shadow-lg hover:scale-105 transition-all disabled:opacity-60 text-sm"
            >
              ➤
            </button>
          </form>
        </div>
      </div>
    </motion.main>
  )
}
