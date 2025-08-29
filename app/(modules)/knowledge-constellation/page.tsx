'use client'
import { useMemo, useState } from 'react'
import { Brain } from 'lucide-react'

type Asset = { title: string; type: 'Deck'|'Playbook'|'ROI Model'|'Case Study'; tags: string[] }

const ASSETS: Asset[] = [
  { title:'GenAI ROI Calculator v2', type:'ROI Model', tags:['genai','finance','calculator'] },
  { title:'TP.ai Partnership Overview', type:'Deck', tags:['partnership','overview'] },
  { title:'Miele Warranty Care — FAB model', type:'Case Study', tags:['miele','fab','care'] },
  { title:'Voicebot Best Practices', type:'Playbook', tags:['voice','bot','best-practices'] }
]

export default function KnowledgeConstellation(){
  const [q,setQ] = useState('')
  const filtered = useMemo(()=> ASSETS.filter(a => (a.title + a.type + a.tags.join(',')).toLowerCase().includes(q.toLowerCase())),[q])

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3">
        <Brain className="text-[var(--tp-indigo)]" />
        <h1 className="text-2xl font-semibold">Knowledge Constellation</h1>
      </div>
      <p className="opacity-70 mt-1">Conversational hub for internal content. Upload RFP asks and get suggested collateral.</p>

      <div className="mt-6 flex items-center gap-3">
        <input value={q} onChange={e=> setQ(e.target.value)} placeholder="Search decks, playbooks, ROI models…" className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10 outline-none w-full" />
        <button onClick={()=> alert('Upload flow placeholder')} className="px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10">Upload</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {filtered.map((a,idx)=>(
          <div key={idx} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 widget-hover">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{a.title}</h3>
              <span className="text-xs opacity-60">{a.type}</span>
            </div>
            <p className="text-xs mt-2 opacity-70">Tags: {a.tags.join(', ')}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={()=> alert('Open chat: ask Oriona about relevance')} className="text-sm px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10">Ask Oriona</button>
              <button onClick={()=> alert('Added to pitch pack')} className="text-sm px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10">Add to pack</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
