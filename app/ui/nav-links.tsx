'use client'

import { usePathname } from 'next/navigation'

export function NavLinks() {
    const pathname = usePathname()

    return (
        <nav className="flex sm:justify-center space-x-4 bg-slate-100">
            {[
                ['Inicio', '/'],
                ['Estudantes', '/students'],
                ['Pagamentos', '/payments'],
                ['Parcelas', '/installments'],
            ].map(([title, url]) => (
                <a key={title} href={url} className={`rounded-lg px-3 py-2 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900 ${pathname === url ? 'bg-slate-200 text-slate-900' : ''}`}>{title}</a>
            ))}
        </nav>
    )
}