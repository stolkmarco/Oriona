'use client'
import { useState } from 'react'

const SRC = 'https://copilotstudio.microsoft.com/environments/66d77e32-ba12-ed48-8cac-2c2a85f015ac/bots/cr81c_businessDevelopmentAssist/webchat?__version__=2'

export default function CopilotWidget(){
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed z-50 bottom-4 right-4">
      {open && (
        <div className="mb-2 w-[360px] h-[560px] rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-[#0f1220] shadow-2xl">
          <iframe src={SRC} title="Copilot" className="w-full h-full" frameBorder={0} />
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className="btn-hover btn-glow rounded-full p-3 ring-1 ring-black/10 dark:ring-white/10 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10" aria-label="Toggle Copilot">
        {open ? '✖︎' : '💬'}
      </button>
    </div>
  )
}
