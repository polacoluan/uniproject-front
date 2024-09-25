'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function NavLinks() {
  const pathname = usePathname()
 
  return (
    <nav>
      <Link className={`link ${pathname === 'uniproject/' ? 'active' : ''}`} href="uniproject/">
        Home
      </Link>
 
      <Link
        className={`link ${pathname === 'uniproject/about' ? 'active' : ''}`}
        href="uniproject/about"
      >
        About
      </Link>
    </nav>
  )
}