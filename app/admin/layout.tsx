'use client'

import { useEffect, type ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    function handleAdminNavigation(event: MouseEvent) {
      const target = event.target as HTMLElement | null
      const button = target?.closest('button')
      if (!button) return
      const text = button.textContent?.trim()
      if (text === 'Logout') {
        event.preventDefault()
        window.location.assign('/api/admin/logout')
      }
      if (text === 'Content') {
        event.preventDefault()
        window.location.assign('/admin/content')
      }
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
      '[class*="bg-[#e7f1eb]"] { width: 46px !important; height: 46px !important; display: flex !important; align-items: center !important; justify-content: center !important; border: 1px solid #d4e7dc !important; border-radius: 14px !important; background: #edf6f0 !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 2px 7px rgba(16,61,43,.06) !important; }',
      '[class*="bg-[#e7f1eb]"] svg { width: 20px !important; height: 20px !important; stroke-width: 2.15 !important; }',
    ].join(' ')
    document.head.appendChild(style)

    const sidebar = document.querySelector('main > div.mx-auto > aside > div')
    if (sidebar && !sidebar.querySelector('[data-view-website]')) {
      const divider = document.createElement('div')
      divider.className = 'my-3 border-t border-white/10'

      const link = document.createElement('a')
      link.href = '/'
      link.target = '_blank'
      link.rel = 'noreferrer'
      link.dataset.viewWebsite = 'true'
      link.className = 'mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white'
      link.innerHTML = '<span style="font-size:16px;line-height:1">↗</span><span>View website</span>'

      const reportLink = document.createElement('a')
      reportLink.href = '/admin/reports'
      reportLink.className = 'mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white'
      reportLink.innerHTML = '<span style="font-size:16px;line-height:1">▣</span><span>Reports</span>'

      const companyLabel = Array.from(sidebar.children).find((child) => child.textContent?.trim() === 'Sage Publishers Ltd.')
      const logoutButton = Array.from(sidebar.querySelectorAll('button')).find((button) => button.textContent?.trim() === 'Logout')

      if (companyLabel) {
        sidebar.insertBefore(divider, companyLabel)
        sidebar.insertBefore(link, companyLabel)
        sidebar.insertBefore(reportLink, companyLabel)
      } else {
        sidebar.appendChild(divider)
        sidebar.appendChild(link)
        sidebar.appendChild(reportLink)
      }

      if (companyLabel && logoutButton) {
        companyLabel.classList.remove('py-2')
        companyLabel.classList.add('mt-3')
      }
    }

    document.addEventListener('click', handleAdminNavigation)
    return () => {
      document.removeEventListener('click', handleAdminNavigation)
      style.remove()
    }
  }, [])

  return <>{children}</>
}
