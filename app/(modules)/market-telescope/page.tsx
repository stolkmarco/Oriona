'use client'
import { useMemo, useState } from 'react'

type Signal = { title: string; source: string; date: string; summary: string; impact: string; accounts: string[] }

const FEED: Signal[] = [
  { title: 'Microsoft launches new CX AI tools', source: 'TechPulse', date: '2025-08-20',
    summary: 'Expanded Copilot for Service with omnichannel summarization and action plugins.',
    impact: 'Position AI-first care for Samsung & Allianz; pitch RoI calculator + TP.ai slide.',
    accounts: ['Samsung','Allianz'] },
  { title: 'AWS introduces real-time contact lens updates', source: 'CloudWire', date: '2025-08-19',
    summary: 'Improved agent assist latency and sentiment accuracy.',
    impact: 'Leverage for TUI seasonal surge handling; bundle with dynamic staffing runbook.',
    accounts: ['TUI'] },
  { title: 'GenAI call containment benchmarks published', source: 'CXWeek', date: '2025-08-18',
    summary: 'Top quartile containment up to 18% with hybrid voice + messaging flows.',
    impact: 'Use for Monzo Phase 2 proposal; reference recent pilot outcomes.', accounts: ['Monzo'] }
]

export default function MarketTelescope(){
  const [q,setQ] = useState('')
  const filtered = useMemo(()=> FEED.filter(f => (f.title+f.summary+f.impact+f.accounts.join(',')).toLowerCase().includes(q.toLowerCase())),[q])

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Market Telescope</h1>
      <p className="opacity-70 mt-1">External BPO/AI/CX signals cross-referenced with TP accounts.</p>

      <div className="mt-6 flex items-center gap-3">
        <input value={q} onChange={e=> setQ(e.target.value)} placeholder="Filter signals, accounts, impact…" className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 outline-none w-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {filtered.map((s,idx)=>(
          <div key={idx} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 widget-hover">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{s.title}</h3>
              <span className="text-xs opacity-60">{s.source} · {s.date}</span>
            </div>
            <p className="mt-2 text-sm opacity-90">{s.summary}</p>
            <div className="mt-3 p-3 rounded-lg bg-black/5 dark:bg-white/5">
              <p className="text-xs uppercase tracking-wide opacity-60">So what for TP</p>
              <p className="text-sm mt-1">{s.impact}</p>
              <p className="text-xs mt-2 opacity-70">Accounts: {s.accounts.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
