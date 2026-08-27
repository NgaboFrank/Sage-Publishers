import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-admin'
import { requireAdmin } from '../../../../lib/admin-auth'

function csvCell(value: unknown) {
  const text = value == null ? '' : String(value)
  return `"${text.replace(/"/g, '""')}"`
}

export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
    const from = request.nextUrl.searchParams.get('from')
    const to = request.nextUrl.searchParams.get('to')

    const filters = ['select=*,customers(name,email,phone),books(title)', 'order=created_at.desc']
    if (from) filters.push(`created_at=gte.${encodeURIComponent(`${from}T00:00:00.000Z`)}`)
    if (to) filters.push(`created_at=lt.${encodeURIComponent(`${to}T23:59:59.999Z`)}`)

    const orders = await supabaseAdmin<Array<Record<string, any>>>(`orders?${filters.join('&')}`)
    const rows = [
      ['Order Number', 'Date', 'Customer', 'Email', 'Phone', 'Book', 'Amount', 'Payment Status', 'Order Status'],
      ...orders.map((order) => [
        order.order_number,
        order.created_at,
        order.customers?.name,
        order.customers?.email,
        order.customers?.phone,
        order.books?.title,
        order.amount,
        order.payment_status,
        order.order_status,
      ]),
    ]

    const csv = rows.map((row) => row.map(csvCell).join(',')).join('\r\n')
    return new NextResponse(`\uFEFF${csv}`, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="sage-publishers-report-${from || 'all'}-${to || 'all'}.csv"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === 'UNAUTHORIZED'
    return NextResponse.json(
      { error: unauthorized ? 'Unauthorized.' : 'Unable to generate report.' },
      { status: unauthorized ? 401 : 500 },
    )
  }
}
