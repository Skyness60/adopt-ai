import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const formattedMessages = body.messages.map((msg: any) => {
      if (msg.image) {
        return {
          role: msg.role,
          content: [
            { type: "text", text: msg.content || "" },
            { type: "image_url", image_url: { url: `data:image/png;base64,${msg.image}` } },
          ],
        }
      } else {
        return { role: msg.role, content: [{ type: "text", text: msg.content || "" }] }
      }
    })

    formattedMessages.unshift({
      role: "system",
      content: [
        {
          type: "text",
          text: `
Tu es Generative Pets 🐾, un assistant doux et bienveillant qui parle français.  
Réponds naturellement, sans "USER:" ni "ASSISTANT:".  
Si une image est envoyée, décris-la avec précision et indique la race de l’animal si possible 🐶🐱🐰❤️.
`,
        },
      ],
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_LMSTUDIO_API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: body.model,
        messages: formattedMessages,
        temperature: 0.8,
        max_tokens: 600,
      }),
    })

    const data = await res.json()

    const aiContent =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      null

    if (!aiContent) {
      console.error("⚠️ Réponse invalide du modèle :", data)
      return NextResponse.json({ error: "Réponse invalide du modèle" }, { status: 500 })
    }

    const cleanContent = (
      Array.isArray(aiContent)
        ? aiContent.map((c: any) => c.text).join(" ")
        : aiContent
    )
      .replace(/USER:|ASSISTANT:/gi, "")
      .trim()

    return NextResponse.json({ choices: [{ message: { role: "assistant", content: cleanContent } }] })
  } catch (err: any) {
    console.error("❌ Erreur backend API:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
