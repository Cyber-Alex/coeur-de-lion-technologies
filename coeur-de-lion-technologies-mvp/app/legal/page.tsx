export const metadata = { title: 'Politique de confidentialité' }

export default function Page() {
  return (
    <div className="container py-12 prose max-w-3xl">
      <h1>Politique de confidentialité (Loi 25 / PIPEDA)</h1>
      <p>
        Nous collectons uniquement les informations nécessaires pour répondre à vos demandes (nom, email, message).
        Les messages envoyés via le formulaire sont transférés par courriel à notre équipe et ne sont pas
        stockés en base de données dans la version initiale du site.
      </p>
      <p>
        Fournisseurs : Vercel (hébergement), OpenAI (assistant IA), Resend/SendGrid (courriels), Crisp/Tawk.to (chat).
        Vos données peuvent transiter hors du Canada selon l’infrastructure de ces fournisseurs.
      </p>
      <p>
        Pour toute question ou demande d’accès/suppression, écrivez à privacy@coeurdeliontechnologies.com.
      </p>
    </div>
  )
}
