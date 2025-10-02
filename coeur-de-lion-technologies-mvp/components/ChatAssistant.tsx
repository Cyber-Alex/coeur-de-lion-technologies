'use client'
import { useState } from 'react'

type Msg = { role: 'user'|'assistant', content: string }

export default function ChatAssistant() {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')

  async function send() {
    const prompt = input.trim()
    if (!prompt) return
    setMsgs(m => [...m, { role: 'user', content: prompt }])
    setInput('')
    const res = await fetch('/api/chat', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ history: msgs, prompt })
    })
    const j = await res.json()
    setMsgs(m => [...m, { role:'assistant', content: j.answer ?? '(pas de réponse)' }])
  }

  return (
    <div className="space-y-3">
      <div className="border rounded p-3 h-72 overflow-y-auto bg-white">
        {msgs.length===0 && <p className="text-gray-500">Bonjour! Posez-moi une question sur nos services (IA, BI, ERP, cybersécurité)…</p>}
        {msgs.map((m,i)=>(
          <div key={i} className={m.role==='user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block px-3 py-2 my-1 rounded ${m.role==='user' ? 'bg-[color:var(--brand-blue)] text-white' : 'bg-gray-100'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} className="flex-1 border rounded p-3" placeholder="Écrivez votre message…" />
        <button onClick={send} className="btn-primary">Envoyer</button>
      </div>
    </div>
  )
}
