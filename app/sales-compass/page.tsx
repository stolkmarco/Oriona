'use client'
import { useMemo, useState } from 'react'

type Prep = { account: string; when: string; topics: string[]; recommends: string[] }

const MEETINGS: Prep[] = [
  { account:'Allianz', when:'Tomorrow 09:30', topics:['GenAI ROI','Copilot for Service'], recommends:['Share ROI Calculator','TP.ai partnership slide'] },
  { account:'Samsung', when:'Mon 14:00', topics:['Omnichannel bots','Containment targets'], recommends:['Monzo pilot highlights','IVR tuning note'] }
]

export default function SalesCompass(){
  const [q,setQ] = useState('')
  const filtered = useMemo(()=> MEETINGS.filter(m => (m.account + m.topics.join(',') + m.recommends.join(',')).toLowerCase().includes(q.toLowerCase())),[q])

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Sales Compass</h1>
      <p className="opacity-70 mt-1">Proactive coach: prep packs, nudges, and content suggestions.</p>

      <div className="mt-6 flex items-center gap-3">
        <input value={q} onChange={e=> setQ(e.target.value)} placeholder="Search meetings, topics…" className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 outline-none w-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {filtered.map((m,idx)=>(
          <div key={idx} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 widget-hover">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{m.account}</h3>
              <span className="text-xs opacity-60">{m.when}</span>
            </div>
            <p className="text-sm opacity-90 mt-2">Topics: {m.topics.join(', ')}</p>
            <div className="mt-3 p-3 rounded-lg bg-black/5 dark:bg-white/5">
              <p className="text-xs uppercase tracking-wide opacity-60">Recommended</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">{m.recommends.map((r,i)=>(<li key={i}>{r}</li>))}</ul>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={()=> alert('Prep pack opened')} className="text-sm px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10">Open prep pack</button>
              <button onClick={()=> alert('Nudge scheduled in CRM')} className="text-sm px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10">Send CRM nudge</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
