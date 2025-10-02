export const metadata = { title: 'Services – Cœur de Lion Technologies' }

const services = [
  {
    title: 'Programmation',
    bullets: [
      'Développement web (Next.js, Node)',
      'Automatisations & scripts (Python/PowerShell)',
      'Intégrations API & connecteurs'
    ]
  },
  {
    title: 'BI & Intelligence d’affaires',
    bullets: [
      'Modélisation & ETL (dbt, Python)',
      'Tableaux de bord (Power BI, Superset)',
      'Data governance & qualité'
    ]
  },
  {
    title: 'ERP & Intégration',
    bullets: [
      'Odoo, SAP, Oracle — intégration & migration',
      'Personnalisation & formation',
      'Amélioration des processus (lean/ops)'
    ]
  },
  {
    title: 'Cybersécurité',
    bullets: [
      'Hygiène TI, MFA, chiffrement, sauvegardes',
      'Audit de base & recommandations',
      'Réponse initiale & remédiation'
    ]
  },
  {
    title: 'IA appliquée',
    bullets: [
      'Assistants & automatisations GPT',
      'RAG (recherche augmentée par la connaissance)',
      'Génération de docs & FAQ dynamiques'
    ]
  }
]

export default function Page() {
  return (
    <div className="container py-12 space-y-8">
      <h1 className="text-3xl font-bold">Nos services</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map(s => (
          <div key={s.title} className="card">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              {s.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
