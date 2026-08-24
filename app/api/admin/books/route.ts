import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-admin'
import { requireAdmin } from '../../../../lib/admin-auth'

export async function GET() {
  try { await requireAdmin(); const books = await supabaseAdmin('books?select=*&order=created_at.desc'); return NextResponse.json({ books }) }
  catch (error) { return NextResponse.json({ error: error instanceof Error && error.message === 'UNAUTHORIZED' ? 'Unauthorized.' : 'Unable to load books.' }, { status: error instanceof Error && error.message === 'UNAUTHORIZED' ? 401 : 500 }) }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const body = await request.json(); const title = String(body.title || '').trim()
    if (!title) return NextResponse.json({ error: 'Book title is required.' }, { status: 400 })
    const books = await supabaseAdmin('books', { method:'POST', body: JSON.stringify({ title, author:String(body.author||'').trim(), description:String(body.description||'').trim(), price:Number(body.price||0), currency:String(body.currency||'RWF'), cover_url:body.cover_url||null, gallery_urls:Array.isArray(body.gallery_urls)?body.gallery_urls:[], published:body.published!==false }) })
    return NextResponse.json({ book:Array.isArray(books)?books[0]:books })
  } catch (error) { const unauthorized = error instanceof Error && error.message === 'UNAUTHORIZED'; return NextResponse.json({ error: unauthorized ? 'Unauthorized.' : 'Unable to create book.' }, { status: unauthorized ? 401 : 500 }) }
}
