'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, FileSpreadsheet, Printer, RefreshCw } from 'lucide-react'

type Order = {
  id: string
  order_number: string
  amount: number
  payment_status: string
  order_status: string
  created_at: string
  customers?: { name: string; email: string; phone: string } | null
  books?: { title: string } | null
}

export default function ReportsPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  async function load() {
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/orders', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to load orders.')
      setOrders(Array.isArray(data.orders) ? data.orders : [])
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load orders.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const filtered = useMemo(() => orders.filter((order) => {
    const date = new Date(order.created_at).getTime()
    if (from && date < new Date(`${from}T00:00:00`).getTime()) return false
    if (to && date > new Date(`${to}T23:59:59`).getTime()) return false
    return true
  }), [orders, from, to])

  const paid = filtered.filter((order) => order.payment_status === 'COMPLETED')
  const revenue = paid.reduce((sum, order) => sum + Number(order.amount || 0), 0)
  const csvUrl = `/api/admin/reports?${new URLSearchParams({ ...(from ? { from } : {}), ...(to ? { to } : {}) }).toString()}`

  return (
    <main className="min-h-screen bg-[#f6f8f7] text-[#10251b]">
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 10mm; }
          html, body { background: white !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          main { min-height: 0 !important; background: white !important; }
          .report-shell { max-width: none !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .report-title { margin-bottom: 8px !important; }
          .report-summary { margin-bottom: 10px !important; }
          .report-card { border: 1px solid #d8dee5 !important; border-radius: 8px !important; box-shadow: none !important; }
          .report-card-header { padding: 7px 9px !important; }
          .report-card-header h2 { font-size: 10px !important; }
          .report-card-header p { font-size: 8px !important; margin-top: 2px !important; }
          .report-table { width: 100% !important; table-layout: fixed !important; border-collapse: collapse !important; font-size: 7.5px !important; }
          .report-table th, .report-table td { padding: 5px 4px !important; vertical-align: top !important; overflow-wrap: anywhere !important; word-break: normal !important; }
          .report-table th { font-size: 6.5px !important; letter-spacing: .03em !important; }
          .report-table th:nth-child(1), .report-table td:nth-child(1) { width: 18% !important; }
          .report-table th:nth-child(2), .report-table td:nth-child(2) { width: 11% !important; }
          .report-table th:nth-child(3), .report-table td:nth-child(3) { width: 18% !important; }
          .report-table th:nth-child(4), .report-table td:nth-child(4) { width: 17% !important; }
          .report-table th:nth-child(5), .report-table td:nth-child(5) { width: 12% !important; }
          .report-table th:nth-child(6), .report-table td:nth-child(6) { width: 12% !important; }
          .report-table th:nth-child(7), .report-table td:nth-child(7) { width: 12% !important; }
          .report-customer-email { display: none !important; }
          .report-status { white-space: normal !important; }
          .report-footer { display: block !important; margin-top: 8px !important; }
          .print-hidden { display: none !important; }
        }
      `}</style>

      <div className="report-shell mx-auto max-w-[1400px] px-5 py-8 lg:px-8">
        <div className="report-title mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print-hidden">
          <div>
            <a href="/admin" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#14532d] hover:underline"><ArrowLeft className="h-4 w-4" /> Back to admin</a>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sales Reports</h1>
            <p className="mt-2 text-sm text-slate-500">Filter your orders and download the report for accounting or records.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={csvUrl} className="inline-flex items-center gap-2 rounded-xl bg-[#103d2b] px-4 py-3 text-sm font-bold text-white hover:bg-[#14532d]"><FileSpreadsheet className="h-4 w-4" /> Download Excel / CSV</a>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"><Printer className="h-4 w-4" /> Save / Print PDF</button>
            <button type="button" onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"><RefreshCw className="h-4 w-4" /> Refresh</button>
          </div>
        </div>

        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm print-hidden">
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="text-sm font-semibold text-slate-700">From<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="mt-2 block w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#14532d]" /></label>
            <label className="text-sm font-semibold text-slate-700">To<input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="mt-2 block w-full rounded-xl border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-[#14532d]" /></label>
            <button type="button" onClick={() => { setFrom(''); setTo('') }} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Clear dates</button>
          </div>
        </section>

        <div className="report-summary mb-6 grid gap-4 sm:grid-cols-3">
          <Summary label="Orders" value={String(filtered.length)} />
          <Summary label="Paid orders" value={String(paid.length)} />
          <Summary label="Revenue" value={`${revenue.toLocaleString()} RWF`} />
        </div>

        {message && <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 print-hidden">{message}</div>}

        <section className="report-card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="report-card-header border-b border-slate-100 px-6 py-5">
            <h2 className="font-bold text-slate-900">Order report</h2>
            <p className="mt-1 text-sm text-slate-500">{from || to ? `${from || 'All dates'} → ${to || 'All dates'}` : 'All available orders'}</p>
          </div>
          {loading ? <div className="p-10 text-center text-sm text-slate-500">Loading orders…</div> : (
            <div className="overflow-x-auto">
              <table className="report-table w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-6 py-4">Order</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Book</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Payment</th><th className="px-6 py-4">Status</th></tr></thead>
                <tbody>{filtered.map((order) => <tr key={order.id} className="border-t border-slate-100"><td className="px-6 py-4 font-bold">{order.order_number}</td><td className="whitespace-nowrap px-6 py-4">{new Date(order.created_at).toLocaleDateString()}</td><td className="px-6 py-4">{order.customers?.name || '—'}<div className="report-customer-email text-xs text-slate-400">{order.customers?.email || ''}</div></td><td className="px-6 py-4">{order.books?.title || '—'}</td><td className="px-6 py-4 font-bold">{Number(order.amount || 0).toLocaleString()} RWF</td><td className="px-6 py-4">{order.payment_status || '—'}</td><td className="report-status px-6 py-4">{order.order_status || '—'}</td></tr>)}</tbody>
              </table>
              {filtered.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No orders match the selected dates.</div>}
            </div>
          )}
        </section>

        <div className="report-footer mt-5 hidden text-xs text-slate-400">Sage Publishers — Sales Report — Generated {new Date().toLocaleString()}</div>
      </div>
    </main>
  )
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="text-sm font-medium text-slate-500">{label}</div><div className="mt-2 text-2xl font-bold text-slate-900">{value}</div></div>
}
