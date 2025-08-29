import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Oriona — Web Chat', description: 'TP Oriona Copilot Web Chat' }
export default function RootLayout({children}:{children:React.ReactNode}){ return (<html lang='en' className='dark'><body>{children}</body></html>) }
