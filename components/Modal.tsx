'use client'
import React from 'react'

export default function Modal({ open, onClose, title, subtitle, children, wide=false }: React.PropsWithChildren<{open:boolean,onClose:()=>void,title:string,subtitle?:string,wide?:boolean}>) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${wide? 'max-w-6xl':'max-w-4xl'} overflow-hidden rounded-2xl bg-white dark:bg-[#0f1220] ring-1 ring-black/10 dark:ring-white/10 shadow-2xl`}>
        <div className="flex items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 p-4 sm:p-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
            {subtitle && <p className="text-sm opacity-60 mt-1">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="group rounded-full border border-black/10 dark:border-white/10 p-2 hover:bg-black/5 dark:hover:bg-white/10 transition" aria-label="Close modal">
            <svg className="h-5 w-5 opacity-80 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </div>
  )
}
