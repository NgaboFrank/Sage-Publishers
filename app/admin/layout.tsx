'use client'

import { useEffect, type ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    function handleLogoutClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      const button = target?.closest('button')
      if (!button || button.textContent?.trim() !== 'Logout') return
      event.preventDefault()
      window.location.assign('/api/admin/logout')
    }

    const style = document.createElement('style')
    style.setAttribute('data-sage-admin-layout', 'true')
    style.textContent = [
      '@media (min-width: 1024px) {',
      'main > header { display: none !important; }',
      'main > div.mx-auto { max-width: none !important; margin: 0 !important; padding: 0 32px 32px 310px !important; display: block !important; }',
      'main > div.mx-auto > aside { display: block !important; position: fixed !important; left: 0 !important; top: 0 !important; bottom: 0 !important; width: 280px !important; height: 100vh !important; padding: 0 !important; margin: 0 !important; z-index: 50 !important; }',
      'main > div.mx-auto > aside > div { position: static !important; width: 100% !important; height: 100vh !important; min-height: 100vh !important; border-radius: 0 !important; border: 0 !important; box-shadow: none !important; padding: 32px 16px !important; overflow-y: auto !important; }',
      'main > div.mx-auto > div.min-w-0 { width: 100% !important; max-width: none !important; padding-top: 32px !important; }',
      '}',
    ].join(' ')
    document.head.appendChild(style)

    document.addEventListener('click', handleLogoutClick)
    return () => {
      document.removeEventListener('click', handleLogoutClick)
      style.remove()
    }
  }, [])

  return <>{children}</>
}
