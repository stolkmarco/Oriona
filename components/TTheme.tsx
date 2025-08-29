'use client'
import { useEffect, useState } from 'react'
export function useTheme(){ const [theme,setTheme]=useState<'light'|'dark'>(()=> (typeof window==='undefined'?'dark':(localStorage.getItem('oriona-theme') as 'light'|'dark')||'dark')); useEffect(()=>{ const r=document.documentElement; theme==='dark'?r.classList.add('dark'):r.classList.remove('dark'); localStorage.setItem('oriona-theme',theme)},[theme]); return { theme,setTheme } }
