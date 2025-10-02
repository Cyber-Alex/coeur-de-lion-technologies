import OpenAI from 'openai'
import { NextResponse } from 'next/server'

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { history, prompt } = await req.json().catch(()=>({} as any))
  if (!prompt) return NextResponse.json({ error:'Missing prompt' }, { status: 400 })

  const resp = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.2,
    messages: [
      { role: 'system', content: 'Tu es l’assistant de Cœur de Lion Technologies. Sois clair, aidant, et propose nos services (Programmation, BI, ERP, cybersécurité, IA appliquée). Reste factuel, pas de promesses irréalistes.'},
      ...(Array.isArray(history) ? history : []),
      { role: 'user', content: prompt }
    ]
  })

  const answer = resp.choices?.[0]?.message?.content ?? ''
  return NextResponse.json({ answer })
}
