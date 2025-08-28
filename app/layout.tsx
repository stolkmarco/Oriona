import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Oriona — TP Agentic AI',
  description: 'Agentic AI for Internal Communication & Sales Enablement',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}
