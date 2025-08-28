import React from 'react'

export default function Card({ title, badge='Active', icon, children, footer, gradient=true }: React.PropsWithChildren<{title:string,badge?:string,icon?:React.ReactNode,footer?:React.ReactNode,gradient?:boolean}>) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white dark:bg-[#0f1220] ${gradient? 'before:pointer-events-none before:absolute before:-inset-20 before:rounded-full before:bg-gradient-to-tr before:from-[#3e2666]/20 before:to-[#780096]/10 before:blur-3xl' : ''}`}>
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-black/5 dark:bg-white/5 ring-1 ring-black/10 dark:ring-white/10">
              {icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
          </div>
          <span className="rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-700/20 dark:ring-emerald-300/30 px-2.5 py-1 text-xs">{badge}</span>
        </div>
        <div className="mt-4 text-sm space-y-2 opacity-90">{children}</div>
        {footer && <div className="mt-5">{footer}</div>}
      </div>
    </div>
  )
}
