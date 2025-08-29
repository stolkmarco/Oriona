import GlowCard from '@/components/ui/GlowCard'
import { Telescope, Compass, Newspaper, Brain } from 'lucide-react'
import Image from 'next/image'

export default function Home(){
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <section className="text-center">
        <div className="flex items-center justify-center gap-3">
          <Image src="/tp-logo-white.png" alt="TP" width={36} height={36} className="hidden dark:block" />
          <Image src="/tp-logo-black.png" alt="TP" width={36} height={36} className="block dark:hidden" />
          <h1 className="text-3xl font-semibold">Oriona</h1>
        </div>
        <p className="opacity-70 mt-2">Agentic AI for Internal Communication & Sales Enablement</p>
      </section>

      <section className="grid md:grid-cols-2 gap-5 mt-10">
        <GlowCard href="/(modules)/project-navigator">
          <div className="flex items-center gap-3">
            <Newspaper className="text-[var(--tp-indigo)]" />
            <div>
              <h3 className="font-semibold">Project Navigator</h3>
              <p className="opacity-70 text-sm">Weekly digest of wins, pilots, partnerships, rollouts. Persona-aware highlights.</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard href="/(modules)/market-telescope">
          <div className="flex items-center gap-3">
            <Telescope className="text-[var(--tp-indigo)]" />
            <div>
              <h3 className="font-semibold">Market Telescope</h3>
              <p className="opacity-70 text-sm">Curated BPO/AI/CX signals with “so what” for TP accounts and RFPs.</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard href="/(modules)/knowledge-constellation">
          <div className="flex items-center gap-3">
            <Brain className="text-[var(--tp-indigo)]" />
            <div>
              <h3 className="font-semibold">Knowledge Constellation</h3>
              <p className="opacity-70 text-sm">Conversational hub for decks, playbooks, ROI models, best practices.</p>
            </div>
          </div>
        </GlowCard>
        <GlowCard href="/(modules)/sales-compass">
          <div className="flex items-center gap-3">
            <Compass className="text-[var(--tp-indigo)]" />
            <div>
              <h3 className="font-semibold">Sales Compass</h3>
              <p className="opacity-70 text-sm">Proactive prep packs, CRM nudges, recommended content for meetings.</p>
            </div>
          </div>
        </GlowCard>
      </section>
    </main>
  )
}
