# Cœur de Lion Technologies — Site MVP (Next.js 14 + Tailwind + IA)

## Démarrage local
```bash
npm install
cp .env.example .env.local # remplissez les clés
npm run dev
```
Ouvrez http://localhost:3000

## Déploiement (Vercel)
1. Créez un projet sur https://vercel.com et connectez ce repo.
2. Ajoutez les variables d’environnement (OPENAI_API_KEY, RESEND_API_KEY, CONTACT_TO, CONTACT_FROM).
3. Déployez. Connectez votre domaine `coeurdeliontechnologies.com` dans Vercel → DNS → SSL auto.

## Personnalisation
- Remplacez `public/logo.png` par votre vrai logo (même nom de fichier).
- Ajoutez votre script Crisp/Tawk dans `app/layout.tsx`.
- Modifiez les textes dans `app/page.tsx` et `app/services/page.tsx`.
- Politique : `app/legal/page.tsx`.

## Sécurité
- Ne jamais exposer vos clés API côté client.
- Vérifiez la conformité Loi 25 (politique, consentements si cookies/analytics).

## À venir (roadmap)
- Streaming des réponses IA, i18n (EN), blog/SEO, rendez-vous (Calendly), Espace client.
