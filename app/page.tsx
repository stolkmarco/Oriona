'use client'
import { useEffect, useMemo, useState } from 'react'
import Button from '@/components/Button'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import Chip from '@/components/Chip'
import TPLogo from '@/components/TPLogo'
import CopilotWidget from '@/components/CopilotWidget'
import { ThemeToggle } from '@/components/TTheme'

const DUMMY = {
  accounts: ['Monzo','Miele','TUI','Samsung','Allianz','IKEA','Revolut','KPN'],
  projectUpdates: [
    { account: 'Monzo', week: '2025-W35', progress: 12, summary: ['Won Phase 2 of Voicebot pilot across UK inbound.','CSAT up 4.2pts WoW; AHT down 9%.','Risk: Legal review on call recording in ROI market.'], milestonesAhead: ['Go-live v2 (Sep 15)','Data-sharing addendum'], blockers: ['Redaction policy alignment'], storyline: 'How Monzo used agent assist + automated QA to unlock a 9% handle-time reduction while keeping CSAT climbing.' },
    { account: 'Miele', week: '2025-W35', progress: 8, summary: ['Launched proactive WhatsApp care for warranty leads.','2 new languages added to knowledge bot (NL, DE).','Pilot NPS +3.1pts vs control.'], milestonesAhead: ['EU roll-out plan','Retail partner enablement'], blockers: ['CRM data mapping for accessories cross-sell'], storyline: "Turning care into commerce: how Miele's proactive messaging converts warranty moments into high-intent accessories sales." },
    { account: 'TUI', week: '2025-W35', progress: 5, summary: ['Voice deflection via trip-status IVR at 24% (target 30%).','Weather disruption playbook shipped.'], milestonesAhead: ['Peak season readiness','Refund automation v1'], blockers: ['IATA integration test window'], storyline: 'From chaos to calm during disruptions — TUI\'s AI triage routes travelers to the fastest answer in minutes, not hours.' },
  ],
  news: [
    { source: 'TechCrunch', title: 'Microsoft unveils new CX AI tooling for contact centers', date: 'Today, 08:15', soWhat: 'Impacts Samsung & Allianz pursuits; align TP.ai connectors to Copilot extension points.', impacted: ['Samsung','Allianz'], topic: 'AI' },
    { source: 'CXWire', title: 'GenAI compliance guidelines updated in EU', date: 'Today, 07:40', soWhat: 'Strengthens TP position on governed AI + redaction layer.', impacted: ['Monzo','Revolut'], topic: 'Policy' },
    { source: 'BPO Weekly', title: 'Competitor announces LATAM expansion', date: 'Yesterday, 17:05', soWhat: 'Watch nearshore pricing for retail vertical; leverage TP hubs.', impacted: ['IKEA','Miele'], topic: 'Competitors' },
  ],
  docs: [
    { title: 'GenAI ROI Calculator.xlsxm', type: 'ROI Model', tags: ['GenAI','Finance','Sales'], score: 98 },
    { title: 'TP.ai Partnership Overview.pptx', type: 'Deck', tags: ['Partnership','AI'], score: 92 },
    { title: 'Miele Care-to-Commerce Playbook.pdf', type: 'Playbook', tags: ['Retail','Messaging'], score: 89 },
    { title: 'FAB Storyline Template.docx', type: 'Template', tags: ['FAB','Pitch'], score: 86 },
    { title: 'Monzo Pilot – Week 35 Update.md', type: 'Update', tags: ['Banking','Pilot'], score: 84 },
  ],
  meetings: [
    { when: 'Tomorrow 10:00 CET', account: 'Allianz', people: ['K. Schneider','R. Alvarez'], agenda: ['Q3 roadmap','AI guardrails','EU ROI assumptions'], nudges: ['Share the GenAI ROI Calculator','Include TP.ai partnership slide','Flag EU compliance update (Market Telescope)'] },
    { when: 'Fri 14:30 CET', account: 'Samsung', people: ['D. Kim','S. Park'], agenda: ['Service automation','Retail peak support'], nudges: ['Bring Monzo success storyline','Offer LATAM nearshore option'] },
  ]
} as const

type Update = typeof DUMMY.projectUpdates[number]

function SectionBullets({ items }: { items: string[] }) {
  return <ul className="list-disc pl-5 space-y-1">{items.map((t,i)=> <li key={i} className="marker:text-black/50 dark:marker:text-white/50 opacity-90">{t}</li>)}</ul>
}

function decideRoute(query: string){
  const q = query.toLowerCase()
  if (DUMMY.accounts.some(a=>q.includes(a.toLowerCase()))) return 'project'
  if (/(news|trend|brief|morning)/.test(q)) return 'market'
  if (/(slide|deck|roi|case|playbook|document|doc|content)/.test(q)) return 'knowledge'
  if (/(prep|meeting|crm|nudge|call)/.test(q)) return 'sales'
  return 'knowledge'
}

export default function Page(){
  const [open,setOpen] = useState<null|'project'|'market'|'knowledge'|'sales'>(null)
  const [query,setQuery] = useState('')
  const [accountFilter,setAccountFilter] = useState('')

  useEffect(()=>{
    const match = DUMMY.accounts.find(a=>query.toLowerCase().includes(a.toLowerCase()))
    setAccountFilter(match || '')
  },[query])

  return (
    <div className="min-h-dvh" style={{ background: `radial-gradient(1200px 600px at -20% -10%, var(--tp-indigoDark)22, transparent 60%), radial-gradient(900px 500px at 120% 10%, var(--tp-purple)22, transparent 60%), var(--tp-slate)` }}>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/10 dark:supports-[backdrop-filter]:bg-black/30 bg-white/60 dark:bg-black/20 border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <TPLogo />
          <div>
            <div className="text-sm uppercase tracking-widest opacity-60">TP</div>
            <div className="-mt-1 font-semibold">Oriona</div>
          </div>
          <span className="hidden sm:inline-flex items-center rounded-full bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 px-2 py-0.5 text-[10px] opacity-60 ml-2">Agentic AI Platform · Powered by TP</span>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Ask Oriona */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative">
          <input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=> e.key==='Enter' && setOpen(decideRoute(query))} placeholder={'Ask Oriona… e.g., "status of Monzo" or "morning news brief"'} className="w-full rounded-xl bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 pl-11 placeholder-black/50 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[rgba(102,72,204,0.6)]" />
          <div className="absolute inset-y-0 left-0 grid place-items-center pl-3 opacity-60">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>
          </div>
          <div className="absolute inset-y-0 right-0 pr-1 flex items-center"><Button variant="subtle" onClick={()=>setOpen(decideRoute(query))}>Ask Oriona<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button></div>
        </div>
      </section>

      {/* Feature cards */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            title="Project Navigator"
            icon={<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 11l19-7-7 19-2-8-8-4z"/></svg>}
            footer={<Button variant="subtle" onClick={()=>setOpen('project')}>Launch Module<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button>}
          >
            <p className="opacity-75">Intelligent project update summaries with personalized insights for different audiences.</p>
            <SectionBullets items={["Auto-summarizes latest project wins, pilots, partnerships.","Adapts tone for executives, sales, enablement.","Week-over-week progress + milestone alerts.","Auto-generates sales storylines from updates."]} />
          </Card>

          <Card
            title="Market Telescope"
            icon={<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12l5-5 5 5-5 5-5-5z"/><path d="M14 7l7 7"/><path d="M14 17l7-7"/></svg>}
            footer={<Button variant="subtle" onClick={()=>setOpen('market')}>Launch Module<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button>}
          >
            <p className="opacity-75">External news monitoring and intelligent market signal curation for competitive advantage.</p>
            <SectionBullets items={["Monitors BPO, AI, CX, and competitor sources daily.","Curates trends into a smart feed or morning brief.","Highlights 'so what' for TP accounts and RFPs."]} />
          </Card>

          <Card
            title="Knowledge Constellation"
            icon={<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-label="Brain icon"><path d="M8.5 3.5c-2 0-3.5 1.6-3.5 3.5v1c-1.1.6-2 1.8-2 3.2 0 1 .4 1.9 1 2.6-.3.6-.5 1.3-.5 2 0 2.2 1.8 4 4 4h1c.6 0 1-.4 1-1v-7c0-1.7-1.3-3-3-3h-.5v-1c0-1 .8-1.8 1.8-1.8.6 0 1.2.3 1.6.7.2.2.5.3.8.3.6 0 1-.4 1-1 0-1.7-1.8-3.5-3.7-3.5z"/><path d="M15.5 3.5c2 0 3.5 1.6 3.5 3.5v1c1.1.6 2 1.8 2 3.2 0 1-.4 1.9-1 2.6.3.6.5 1.3.5 2 0 2.2-1.8 4-4 4h-1c-.6 0-1-.4-1-1v-7c0-1.7 1.3-3 3-3h.5v-1c0-1-.8-1.8-1.8-1.8-.6 0-1.2.3-1.6.7-.2.2-.5.3-.8.3-.6 0-1-.4-1-1 0-1.7 1.8-3.5 3.7-3.5z"/></svg>}
            footer={<Button variant="subtle" onClick={()=>setOpen('knowledge')}>Launch Module<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button>}
          >
            <p className="opacity-75">Conversational knowledge base connecting slides, playbooks, ROI models, and best practices.</p>
            <SectionBullets items={["Chat to find the right slide or case study in seconds.","Auto-suggests related content for RFPs.","Learns which content resonates and improves."]} />
          </Card>

          <Card
            title="Sales Compass"
            icon={<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m16 8-4 8-4-4 8-4z"/></svg>}
            footer={<Button variant="subtle" onClick={()=>setOpen('sales')}>Launch Module<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Button>}
          >
            <p className="opacity-75">Proactive sales guidance with AI-powered coaching and CRM context via Copilot/SharePoint.</p>
            <SectionBullets items={["Sends prep packs ahead of client meetings.","Integrates with CRM for timely nudges.","Navigates sales complexity with recommended assets."]} />
          </Card>
        </div>
      </main>

      {/* PROJECT NAVIGATOR */}
      <Modal open={open==='project'} onClose={()=>setOpen(null)} title="Project Navigator" subtitle="Personalized digest of wins, pilots, partnerships, and rollouts" wide>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
          <div className="flex items-center gap-2"><Chip>Week over Week Comparison</Chip><Chip>Storyline Generator</Chip>{accountFilter && <Chip>Filter: {accountFilter}</Chip>}</div>
          <div className="relative"><input value={accountFilter} onChange={e=>setAccountFilter(e.target.value)} placeholder="Filter by account (e.g., Monzo)" className="w-64 rounded-lg bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 px-3 py-2 pl-9 text-sm placeholder-black/50 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[rgba(102,72,204,0.6)]" /><div className="absolute inset-y-0 left-0 grid place-items-center pl-2.5 opacity-60"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg></div></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {DUMMY.projectUpdates.filter(u=>!accountFilter || u.account.toLowerCase().includes(accountFilter.toLowerCase())).map((u: Update)=>(
            <div key={u.account} className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 widget-hover">
              <div className="flex items-start justify-between"><div><h4 className="font-semibold">{u.account} · <span className="opacity-60">{u.week}</span></h4><p className="text-emerald-700 dark:text-emerald-300 text-xs mt-1">Progress +{u.progress}% WoW</p></div><Chip>Milestones: {u.milestonesAhead.length}</Chip></div>
              <div className="mt-3"><p className="text-xs uppercase tracking-wide opacity-60">Highlights</p><SectionBullets items={u.summary} /></div>
              <div className="mt-3"><p className="text-xs uppercase tracking-wide opacity-60">Blockers</p>{u.blockers.length? <SectionBullets items={u.blockers} /> : <p className="opacity-80 text-sm">No blockers.</p>}</div>
              <div className="mt-4 flex items-center gap-2"><Button variant="ghost" onClick={()=>alert(`Storyline for ${u.account}:\n\n${u.storyline}`)}>Generate sales storyline</Button><Button variant="ghost" onClick={()=>alert('Shared with: Executives · Sales · Enablement')}>Share digest</Button></div>
            </div>
          ))}
        </div>
      </Modal>

      {/* MARKET TELESCOPE */}
      <Modal open={open==='market'} onClose={()=>setOpen(null)} title="Market Telescope" subtitle="Cross-referenced external signals with TP accounts" wide>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {DUMMY.news.map((n, idx)=>(
            <div key={idx} className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 widget-hover">
              <div className="flex items-center justify-between gap-2"><Chip>{n.topic}</Chip><span className="text-xs opacity-60">{n.date}</span></div>
              <h4 className="font-semibold mt-2">{n.title}</h4>
              <p className="opacity-60 text-sm mt-1">Source: {n.source}</p>
              <div className="mt-3 text-sm opacity-90"><span className="uppercase text-[10px] tracking-wide opacity-60">So what for TP</span><p className="mt-1">{n.soWhat}</p></div>
              <div className="mt-3 flex flex-wrap gap-2">{n.impacted.map(a=> <Chip key={a}>Impacted: {a}</Chip>)}</div>
              <div className="mt-4 flex gap-2"><Button variant="ghost" onClick={()=>alert('Added to Morning Brief')}>Add to Morning Brief</Button><Button variant="ghost" onClick={()=>alert('Shared with account team')}>Share</Button></div>
            </div>
          ))}
        </div>
        <div className="mt-6"><Button variant="subtle" onClick={()=>alert('Morning Brief generated (dummy)')}>Generate Morning Brief</Button></div>
      </Modal>

      {/* KNOWLEDGE CONSTELLATION */}
      <Modal open={open==='knowledge'} onClose={()=>setOpen(null)} title="Knowledge Constellation" subtitle="Conversational access to decks, playbooks, training, and ROI models" wide>
        <KnowledgeModule />
      </Modal>

      {/* SALES COMPASS */}
      <Modal open={open==='sales'} onClose={()=>setOpen(null)} title="Sales Compass" subtitle="Proactive guidance · CRM nudges · SharePoint/Copilot context" wide>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {DUMMY.meetings.map((m, idx)=>(
            <div key={idx} className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 widget-hover">
              <div className="flex items-center justify-between gap-3"><h4 className="font-semibold">{m.account} · <span className="opacity-60">{m.when}</span></h4><Chip>Prep Pack</Chip></div>
              <p className="opacity-60 text-sm mt-1">Attendees: {m.people.join(', ')}</p>
              <div className="mt-3"><p className="text-xs uppercase tracking-wide opacity-60">Agenda</p><SectionBullets items={m.agenda} /></div>
              <div className="mt-3"><p className="text-xs uppercase tracking-wide opacity-60">Nudges</p><SectionBullets items={m.nudges} /></div>
              <div className="mt-4 flex items-center gap-2"><Button variant="ghost" onClick={()=>alert('Sent prep pack to your inbox (dummy)')}>Send Prep Pack</Button><Button variant="ghost" onClick={()=>alert('Posted to CRM (dummy)')}>Push to CRM</Button></div>
            </div>
          ))}
        </div>
      </Modal>

      <footer className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 text-center opacity-60">
        <div className="mt-10 text-xs">© {new Date().getFullYear()} TP · Oriona — Internal Only</div>
      </footer>

      <CopilotWidget />
    </div>
  )
}

function KnowledgeModule(){
  const [term,setTerm] = useState('')
  const results = useMemo(()=>{
    const t = term.toLowerCase();
    if(!t) return DUMMY.docs
    return DUMMY.docs.filter(d=> d.title.toLowerCase().includes(t) || d.tags.some(x=>x.toLowerCase().includes(t)))
  },[term])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative w-full sm:w-96">
          <input value={term} onChange={e=>setTerm(e.target.value)} placeholder="Search slides, playbooks, ROI…" className="w-full rounded-lg bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 px-3 py-2 pl-9 text-sm placeholder-black/50 dark:placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[rgba(102,72,204,0.6)]" />
          <div className="absolute inset-y-0 left-0 grid place-items-center pl-2.5 opacity-60"><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg></div>
        </div>
        <div className="flex flex-wrap gap-2"><Chip>Auto-suggests related content</Chip><Chip>Learns from pitch success</Chip></div>
      </div>
      {results.length===0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 p-8 text-center"><h4 className="font-medium">No results</h4><p className="opacity-60 text-sm mt-1">Try another keyword like ‘ROI’, ‘playbook’, or an account name.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((d,i)=>(
            <div key={i} className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-4 widget-hover">
              <div className="flex items-start justify-between gap-3"><h4 className="font-semibold">{d.title}</h4><Chip>{d.type}</Chip></div>
              <div className="mt-2 flex flex-wrap gap-2">{d.tags.map((t:string)=>(<span key={t} className="rounded-lg bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 px-2 py-0.5 text-[11px] opacity-80">#{t}</span>))}</div>
              <div className="mt-4 flex items-center justify-between"><div className="text-xs opacity-60">Relevance {d.score}%</div><Button variant="ghost" onClick={()=>alert(`${d.title} opened (dummy)`)}>Open<svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg></Button></div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 flex items-center gap-2"><Button variant="subtle" onClick={()=>alert('RFP helper booted (dummy)')}>Suggest for RFP</Button><Button variant="ghost" onClick={()=>alert('Uploaded and indexed (dummy)')}>Upload content</Button></div>
    </div>
  )
}
