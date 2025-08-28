import React from 'react'
export default function Chip({ children }: React.PropsWithChildren) { return <span className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-1 text-xs opacity-80">{children}</span> }
