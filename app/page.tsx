'use client'
import CopilotWidget from '@/components/CopilotWidget'
export const dynamic = 'force-static'
export default function Page(){ return (<main className='min-h-dvh p-6'><h1 className='text-2xl font-semibold'>Oriona · TP Web Chat</h1><p className='opacity-70 mt-2'>This build uses Bot Framework Web Chat with TP styling.</p><div className='mt-10 h-[400px] rounded-xl ring-1 ring-white/10 bg-white/5 p-6'>Demo content area</div><CopilotWidget/></main>) }
