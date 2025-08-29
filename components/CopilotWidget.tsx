'use client';

import { useEffect, useState } from 'react';
import CopilotWebChat from './CopilotWebChat';

export default function CopilotWidget(){
  const [open,setOpen] = useState(false);
  useEffect(()=>{ const s = typeof window!=='undefined' ? localStorage.getItem('oriona-copilot-open') : null; if(s===null) setOpen(true); else setOpen(s==='1'); },[]);
  useEffect(()=>{ if(typeof window!=='undefined') localStorage.setItem('oriona-copilot-open', open ? '1':'0') },[open]);
  return (
    <div className="fixed z-[9999] bottom-4 right-4">
      {open && (
        <div className="mb-3 w-[420px] max-w-[96vw] h-[640px] max-h-[75vh] rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-[#0f1220] shadow-2xl widget-hover">
          <div className="h-2 bg-gradient-to-r from-[var(--tp-indigo)] to-[var(--tp-violet)]" />
          <CopilotWebChat />
        </div>
      )}
      <button onClick={()=> setOpen(!open)} className="rounded-full px-4 py-3 ring-1 ring-black/10 dark:ring-white/10 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 flex items-center gap-2 transition" aria-label="Toggle Copilot">
        <span role="img" aria-hidden>💬</span>
        <span className="text-sm font-medium">{open? 'Hide chat' : 'Chat'}</span>
      </button>
    </div>
  );
}
