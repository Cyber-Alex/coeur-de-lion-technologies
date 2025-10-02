import ContactForm from '@/components/ContactForm'

export const metadata = { title: 'Contact – Cœur de Lion Technologies' }

export default function Page() {
  return (
    <div className="container py-12 grid md:grid-cols-2 gap-10">
      <div>
        <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-gray-700 mb-6">
          Parlez-nous de votre projet (ERP, BI, IA, cybersécurité). Nous répondons rapidement.
        </p>
        <ContactForm />
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">Info</h3>
        <p>Cœur de Lion Technologies</p>
        <p>Saint‑Jérôme, QC</p>
        <p>Courriel: contact@coeurdeliontechnologies.com</p>
        <p>Tél.: 579‑888‑7050</p>
      </div>
    </div>
  )
}
