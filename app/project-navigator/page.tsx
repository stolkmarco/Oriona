'use client'
import { useMemo, useState } from 'react'

type Update = {
  account: string;
  week: string;
  progress: number;
  summary: string[];
  blockers: string[];
  milestonesAhead: string[];
  storyline: string;
}

const DATA: Update[] = [
  {
    account: 'Monzo', week: '2025-W35', progress: 12,
    summary: ['Won Phase 2 of Voicebot pilot across UK inbound.', 'CSAT up 4.2pts WoW; AHT down 9%.', 'Risk: Legal review on call recording in ROI market.'],
    blockers: ['Legal review on ROI call recording'],
    milestonesAhead: ['Go-live Phase 2 (Sep 12)', 'Legal sign-off (Sep 6)'],
    storyline: 'Monzo expanded Voicebot pilot after measurable CSAT lift; we’re positioned to roll out to EU inbound after ROI legal approval.'
  },
  {
    account: 'Miele', week: '2025-W35', progress: 7,
    summary: ['Launched proactive WhatsApp care for warranty leads.', '2 new languages added to knowledge bot (NL, DE).', 'Pilot NPS +3.1pts vs control.'],
    blockers: [],
    milestonesAhead: ['Scale WApp to Benelux (Sep 18)'],
    storyline: 'WhatsApp care is driving warranty conversion; next step is Benelux scale with localized scripts.'
  },
  {
    account: 'TUI', week: '2025-W35', progress: 4,
    summary: ['IVR containment up 3.8pts on summer surge.', 'Dynamic staffing runbook shipped.', 'RFP hint: winter seasonality workforce mgmt.'],
    blockers: ['Telephony SSO bug'],
    milestonesAhead: ['SSO fix (Sep 3)', 'Containment target +6pts (Oct)'],
    storyline: 'Containment lift confirms IVR tuning; winter RFP likely focuses on WFM + containment play.'
  }
]

const personas = ['Executives','Sales','Enablement'] as const

export default function ProjectNavigator(){
  const [persona, setPersona] = useState<typeof personas[number]>('Executives')
  const [q, setQ] = useState('')

  const filtered = useMemo(()=> DATA.filter(d => d.account.toLowerCase().includes(q.toLowerCase())),[q])

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Project Navigator</h1>
      <p className="opacity-70 mt-1">Persona-aware weekly digest. Ask Oriona for Monzo, Miele, TUI…</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {personas.map(p => (
          <button key={p} onClick={()=> setPersona(p)} className={`px-3 py-2 rounded-lg text-sm ring-1 ring-black/10 dark:ring-white/10 ${p===persona ? 'bg-[var(--tp-indigo)]/90 text-white' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'}`}>
            {p}
          </button>
        ))}
        <input value={q} onChange={e=> setQ(e.target.value)} placeholder="Search account…" className="ml-auto px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 outline-none" />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {filtered.map(u => (
          <div key={u.account} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 widget-hover">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{u.account} · <span className="opacity-60">{u.week}</span></h4>
                <p className="text-emerald-700 dark:text-emerald-300 text-xs mt-1">Progress +{u.progress}% WoW</p>
              </div>
              <span className="text-xs px-2 py-1 rounded bg-black/5 dark:bg-white/10">Milestones: {u.milestonesAhead.length}</span>
            </div>

            <div className="mt-3">
              <p className="text-xs uppercase tracking-wide opacity-60">Highlights</p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-sm opacity-90">
                {u.summary.map((s,i)=>(<li key={i}>{s}</li>))}
              </ul>
            </div>

            <div className="mt-3">
              <p className="text-xs uppercase tracking-wide opacity-60">Blockers</p>
              {u.blockers.length ? (
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm opacity-90">{u.blockers.map((b,i)=>(<li key={i}>{b}</li>))}</ul>
              ) : (<p className="opacity-80 text-sm">No blockers.</p>)}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button onClick={()=> alert(`Storyline for ${u.account}:\n\n${u.storyline}`)} className="text-sm px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10">Generate sales storyline</button>
              <button onClick={()=> alert('Shared with: Executives · Sales · Enablement')} className="text-sm px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10">Share digest</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
