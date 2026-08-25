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

    document.addEventListener('click', handleLogoutClick)
    return () => document.removeEventListener('click', handleLogoutClick)
  }, [])

  return <>{children}</>
}
