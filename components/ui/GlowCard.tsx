import { ReactNode } from 'react';
import Link from 'next/link';

export default function GlowCard({ href, children }: { href: string; children: ReactNode }){
  return (
    <Link href={href} className="block rounded-2xl ring-1 ring-black/10 dark:ring-white/10 bg-white/70 dark:bg-white/5 p-5 card-hover glow">
      {children}
    </Link>
  );
}
