import Link from 'next/link'
import {icon} from 'lucide-react'

export default function Page(){
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/" className="text-sm opacity-70 hover:opacity-100">← Back</Link>
      <h1 className="mt-4 text-2xl font-semibold flex items-center gap-2"><{icon} className="text-[var(--tp-indigo)]" /> {title}</h1>
      <p className="opacity-70 mt-2">Demo content for {title}. Replace with real data.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="rounded-xl ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-white/5 p-4 widget-hover">
            <h3 className="font-medium">Card {i}</h3>
            <p className="opacity-70 text-sm mt-1">This is placeholder data for {title} card {i}.</p>
          </div>
        ))}
      </div>
    </main>
  )
}
