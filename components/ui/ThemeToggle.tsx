'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle(){
  const initial: 'light'|'dark' = (typeof window==='undefined')
    ? 'dark'
    : (localStorage.getItem('oriona-theme') as 'light'|'dark')
      || (document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  const [theme,setTheme] = useState<'light'|'dark'>(initial);

  useEffect(()=>{
    const r = document.documentElement;
    if(theme==='dark'){ r.classList.add('dark'); r.classList.remove('light'); }
    else { r.classList.remove('dark'); r.classList.add('light'); }
    localStorage.setItem('oriona-theme', theme);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('oriona-theme', { detail: theme }));
    }
  },[theme]);

  return (
    <button onClick={()=> setTheme(prev => prev==='dark' ? 'light' : 'dark')} className="flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-black/10 dark:ring-white/10 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 transition" aria-label="Toggle theme">
      {theme==='dark' ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-sm">{theme==='dark' ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
}
