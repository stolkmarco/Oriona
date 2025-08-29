import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import CopilotWidget from '@/components/CopilotWidget'

export const metadata = { title: 'Oriona — Agentic AI for TP', description: 'Internal Communication & Sales Enablement' }

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" className="dark">
      <body>
        <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-[#0f1220]/60 border-b border-black/10 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/tp-logo-white.png" alt="TP" width={28} height={28} className="hidden dark:block" />
              <Image src="/tp-logo-black.png" alt="TP" width={28} height={28} className="block dark:hidden" />
              <span className="font-semibold">Oriona</span>
              <span className="text-xs opacity-60 ml-2">Agentic AI</span>
            </Link>
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/(modules)/project-navigator" className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition">Project Navigator</Link>
              <Link href="/(modules)/market-telescope" className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition">Market Telescope</Link>
              <Link href="/(modules)/knowledge-constellation" className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition">Knowledge Constellation</Link>
              <Link href="/(modules)/sales-compass" className="px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition">Sales Compass</Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        {children}
        <CopilotWidget />
        <footer className="mt-16 border-t border-black/10 dark:border-white/10 py-8 text-center text-xs opacity-60">© TP · Oriona</footer>
      </body>
    </html>
  )
}
