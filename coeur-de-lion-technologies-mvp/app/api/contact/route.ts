import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, message } = await req.json().catch(()=>({} as any))
  if (!name || !email || !message) {
    return NextResponse.json({ ok:false, error:'Champs requis.' }, { status: 400 })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const CONTACT_TO = process.env.CONTACT_TO
  const CONTACT_FROM = process.env.CONTACT_FROM

  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    return NextResponse.json({ ok:false, error:'Serveur non configuré (env manquantes).' }, { status: 500 })
  }

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject: 'Nouveau message – Cœur de Lion Technologies',
      html: `<p><b>Nom:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Message:</b><br/>${String(message).replace(/\n/g,'<br/>')}</p>`
    })
  })

  if (!r.ok) {
    const txt = await r.text()
    return NextResponse.json({ ok:false, error: txt || 'Erreur email' }, { status: 500 })
  }

  return NextResponse.json({ ok:true })
}
