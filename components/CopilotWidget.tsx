'use client'
import { useEffect, useState } from 'react'
import CopilotWebChat from './CopilotWebChat'
import { useTheme } from './TTheme'

export default function CopilotWidget(){
  const [open,setOpen] = useState(false)
  const { theme } = useTheme()
  useEffect(()=>{ const s=typeof window!=='undefined'?localStorage.getItem('oriona-copilot-open'):null; if(s===null) setOpen(true); else setOpen(s==='1') },[])
  useEffect(()=>{ if(typeof window!=='undefined') localStorage.setItem('oriona-copilot-open', open?'1':'0') },[open])
  return (
    <div className='fixed z-[9999] bottom-4 right-4'>
      {open && (
        <div className='mb-3 w-[380px] max-w-[96vw] h-[600px] max-h-[70vh] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-[#0f1220] shadow-2xl'>
          <div className='h-2 bg-gradient-to-r from-[#4d3293] to-[#780096]' />
          <CopilotWebChat theme={theme} />
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className='btn bg-black/10 dark:bg-white/10'>💬 {open?'Hide chat':'Chat'}</button>
    </div>
  )
}
