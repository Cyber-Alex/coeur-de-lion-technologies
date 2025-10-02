'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [state, setState] = useState<'idle'|'sending'|'sent'|'error'>('idle')
  const [err, setErr] = useState<string>('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending'); setErr('')
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries()) as any
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) setState('sent')
    else { setState('error'); const j = await res.json().catch(()=>({})); setErr(j.error || 'Erreur inconnue') }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input name="name" placeholder="Votre nom" className="w-full border p-3 rounded" required />
      <input type="email" name="email" placeholder="Votre courriel" className="w-full border p-3 rounded" required />
      <textarea name="message" placeholder="Comment pouvons-nous aider ?" rows={6} className="w-full border p-3 rounded" required />
      <button disabled={state==='sending'} className="btn-primary">{state==='sending' ? 'Envoi…' : 'Envoyer'}</button>
      {state==='sent' && <p className="text-green-700">Merci! Nous vous répondons rapidement.</p>}
      {state==='error' && <p className="text-red-700">{err}</p>}
    </form>
  )
}
