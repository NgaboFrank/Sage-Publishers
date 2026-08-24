import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-admin'
import { requireAdmin } from '../../../../lib/admin-auth'

export async function GET() {
  try { await requireAdmin(); const orders = await supabaseAdmin('orders?select=*,customers(name,email,phone),books(title)&order=created_at.desc'); return NextResponse.json({ orders }) }
  catch (error) { const unauthorized = error instanceof Error && error.message === 'UNAUTHORIZED'; return NextResponse.json({ error: unauthorized ? 'Unauthorized.' : 'Unable to load orders.' }, { status: unauthorized ? 401 : 500 }) }
}
