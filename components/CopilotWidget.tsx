'use client';

import { useEffect, useState } from 'react';
import CopilotWebChat from './CopilotWebChat';

export default function CopilotWidget(){
  const [open,setOpen] = useState(false);
  const [theme, setTheme] = useState<'light'|'dark'>(() => (typeof window==='undefined' ? 'dark' : (localStorage.getItem('oriona-theme') as 'light'|'dark') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light')));

  useEffect(()=>{
    const saved = typeof window!=='undefined' ? localStorage.getItem('oriona-copilot-open') : null;
    if(saved===null) setOpen(true); else setOpen(saved==='1');
  },[]);

  useEffect(()=>{ if(typeof window!=='undefined') localStorage.setItem('oriona-copilot-open', open ? '1':'0') },[open]);

  useEffect(()=>{
    const getTheme = () => document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const onEvt = (e: any) => setTheme(e?.detail || getTheme());
    const onStorage = (e: StorageEvent) => { if(e.key==='oriona-theme') setTheme(getTheme()); }
    window.addEventListener('oriona-theme', onEvt as any);
    window.addEventListener('storage', onStorage);
    setTheme(getTheme());
    return () => {
      window.removeEventListener('oriona-theme', onEvt as any);
      window.removeEventListener('storage', onStorage);
    };
  },[]);

  return (
    <div className="fixed z-[9999] bottom-4 right-4">
      {open && (
        <div className="mb-3 w-[420px] max-w-[96vw] h-[640px] max-h-[75vh] rounded-2xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-[#0f1220] shadow-2xl widget-hover">
          <div className="h-2 bg-gradient-to-r from-[var(--tp-indigo)] to-[var(--tp-violet)]" />
          <CopilotWebChat theme={theme} />
        </div>
      )}
      <button onClick={()=> setOpen(!open)} className="rounded-full px-4 py-3 ring-1 ring-black/10 dark:ring-white/10 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 flex items-center gap-2 transition" aria-label="Toggle Copilot">
        <span role="img" aria-hidden>💬</span>
        <span className="text-sm font-medium">{open? 'Hide chat' : 'Chat'}</span>
      </button>
    </div>
  );
}
