import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cœur de Lion Technologies',
  description: 'IA, BI, ERP & Cybersécurité — solutions pragmatiques, humaines et efficaces.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="bg-gray-50">
      <body className="min-h-screen flex flex-col font-sans">
        {/* HEADER */}
        <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <div className="container py-3 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Logo SVG */}
              <img src="/logo.svg" alt="Cœur de Lion Technologies" className="h-9 w-auto group-hover:scale-105 transition" />
              <div className="leading-tight">
                <div className="font-semibold text-[color:var(--brand-blue)]">Cœur de Lion</div>
                <div className="text-xs tracking-wide text-gray-600">TECHNOLOGIES</div>
              </div>
            </Link>

            <nav className="ml-auto flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-[color:var(--brand-blue)]">Accueil</Link>
              <Link href="/services" className="hover:text-[color:var(--brand-blue)]">Services</Link>
              <Link href="/contact" className="hover:text-[color:var(--brand-blue)]">Contact</Link>
              <Link href="/legal" className="hidden sm:inline hover:text-[color:var(--brand-blue)]">Confidentialité</Link>
              <Link href="/contact" className="btn-primary hidden md:inline">Évaluation gratuite</Link>
              <link rel="manifest" href="/manifest.json" />
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0b4da2" />
              <meta name="theme-color" content="#0b4da2" />
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="border-t bg-white mt-12">
          <div className="container py-8 text-sm text-gray-600 flex flex-col md:flex-row gap-2 md:gap-6">
            <span>© {new Date().getFullYear()} Cœur de Lion Technologies</span>
            <Link href="/legal" className="hover:underline">Politique de confidentialité</Link>
          </div>
        </footer>

        {/* === Chat Crisp (décommente et mets ton ID pour activer) ===
        <script dangerouslySetInnerHTML={{__html: `
          window.$crisp=[];window.CRISP_WEBSITE_ID="TON_CRISP_ID";
          (function(){var d=document,s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;
          d.getElementsByTagName("head")[0].appendChild(s);})();
        `}} />
        */}
      </body>
    </html>
  )
}
