import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cœur de Lion Technologies',
  description: 'IA, BI, ERP & Cybersécurité — solutions pragmatiques, humaines et efficaces.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header className="border-b bg-white">
          <div className="container py-4 flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="h-10 w-10" />
            <div className="font-semibold text-lg">Cœur de Lion Technologies</div>
            <nav className="ml-auto flex gap-6">
              <a href="/" className="hover:underline">Accueil</a>
              <a href="/services" className="hover:underline">Services</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t bg-white mt-12">
          <div className="container py-8 text-sm text-gray-600 flex flex-col md:flex-row gap-2 md:gap-6">
            <span>© {new Date().getFullYear()} Cœur de Lion Technologies</span>
            <a href="/legal" className="hover:underline">Politique de confidentialité</a>
          </div>
        </footer>

        {/* Chat humain (Crisp ou Tawk.to) - colle ton script ici */}
        {/* Exemple Crisp:
        <script dangerouslySetInnerHTML={{__html: `
          window.$crisp=[];window.CRISP_WEBSITE_ID="YOUR_CRISP_ID";
          (function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;
          d.getElementsByTagName("head")[0].appendChild(s);})();
        `}}/>
        */}
      </body>
    </html>
  )
}
