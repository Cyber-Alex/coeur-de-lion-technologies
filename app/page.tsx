 "use client";
import Link from 'next/link'
import ChatAssistant from '@/components/ChatAssistant'

export default function Home() {
  return (
    <div>
      {/* HERO — bloc 3 remplacé */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              IA, BI, ERP & Cybersécurité<br/> 
              <span className="text-[color:var(--brand-blue)]">solutions pragmatiques, humaines et efficaces.</span>
            </h1>
            <p className="text-lg text-gray-700">
              Nous aidons les PME à concevoir, intégrer et sécuriser leurs systèmes — de l’ERP à l’IA appliquée.
            </p>
            <div className="flex gap-3">
              <Link href="/contact" className="btn-primary">Évaluation gratuite</Link>
              <Link href="/services" className="btn-outline">Voir nos services</Link>
            </div>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Parler à notre assistant IA</h3>
            <ChatAssistant />
          </div>
        </div>
      </section>

      {/* Cartes services */}
      <section className="container py-12 grid md:grid-cols-4 gap-6">
        {[
          {title:'Programmation',desc:'Solutions web, scripts, intégrations API.'},
          {title:'BI & Data',desc:'Tableaux de bord, pipelines, décisions guidées par la donnée.'},
          {title:'ERP & Intégration',desc:'Odoo, SAP, Oracle — intégration et optimisation.'},
          {title:'Cybersécurité',desc:'Hygiène TI, audits, durcissement, réponse initiale.'},
        ].map((s)=>(
          <div key={s.title} className="card">
            <h4 className="font-semibold text-lg">{s.title}</h4>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
