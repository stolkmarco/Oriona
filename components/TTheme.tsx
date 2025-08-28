'use client'
import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light'|'dark'>(()=>{
    if (typeof window === 'undefined') return 'dark'
    return (localStorage.getItem('oriona-theme') as 'light'|'dark') || 'dark'
  })
  useEffect(()=>{
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('oriona-theme', theme)
  }, [theme])
  return { theme, setTheme }
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      onClick={()=> setTheme(theme==='dark'?'light':'dark')}
      className="btn-hover btn-glow inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ring-1 ring-black/10 dark:ring-white/10 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme==='dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
