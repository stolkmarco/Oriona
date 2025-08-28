'use client'
import React from 'react'

const COLORS = {
  indigoDark: '#3e2666',
  indigo: '#4d3293',
  purple: '#780096',
}

function getButtonVariant(variant: 'primary'|'ghost'|'subtle') {
  const baseClass = 'text-white ring-1 ring-white/10 btn-hover btn-glow'
  switch(variant){
    case 'primary':
      return { className: baseClass + ' hover:opacity-95', style: { backgroundColor: COLORS.indigoDark } as React.CSSProperties }
    case 'ghost':
      return { className: 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-inherit ring-1 ring-black/10 dark:ring-white/10 btn-hover btn-glow', style: {} as React.CSSProperties }
    case 'subtle':
      return { className: baseClass + ' hover:opacity-95', style: { backgroundImage: `linear-gradient(to right, ${COLORS.indigo}, ${COLORS.purple})` } as React.CSSProperties }
    default:
      return { className: baseClass, style: {} as React.CSSProperties }
  }
}

export default function Button({ children, onClick, variant='primary', className='', type='button'}: React.PropsWithChildren<{onClick?:()=>void, variant?:'primary'|'ghost'|'subtle', className?:string, type?: 'button'|'submit'|'reset'}>) {
  const base = 'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
  const v = getButtonVariant(variant)
  return <button type={type} onClick={onClick} className={[base, v.className, className].join(' ')} style={v.style}>{children}</button>
}
