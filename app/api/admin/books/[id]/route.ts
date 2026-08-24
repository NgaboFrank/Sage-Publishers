import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../../lib/admin-auth'
import { supabaseAdmin } from '../../../../../lib/supabase-admin'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: Request, { params }: Params) {
  try {
    await requireAdmin()
    const { id } = await params
    const body = await request.json()
    const patch: Record<string, unknown> = {}
    if (body.title !== undefined) patch.title = String(body.title).trim()
    if (body.author !== undefined) patch.author = String(body.author).trim()
    if (body.description !== undefined) patch.description = String(body.description).trim()
    if (body.price !== undefined) patch.price = Number(body.price)
    if (body.currency !== undefined) patch.currency = String(body.currency).toUpperCase()
    if (body.cover_url !== undefined) patch.cover_url = body.cover_url || null
    if (body.gallery_urls !== undefined) patch.gallery_urls = Array.isArray(body.gallery_urls) ? body.gallery_urls : []
    if (body.published !== undefined) patch.published = Boolean(body.published)
    patch.updated_at = new Date().toISOString()
    const rows = await supabaseAdmin(`books?id=eq.${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(patch) })
    return NextResponse.json({ book: Array.isArray(rows) ? rows[0] : rows })
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === 'UNAUTHORIZED'
    return NextResponse.json({ error: unauthorized ? 'Unauthorized.' : 'Unable to update book.' }, { status: unauthorized ? 401 : 500 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await requireAdmin()
    const { id } = await params
    await supabaseAdmin(`books?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' })
    return NextResponse.json({ ok: true })
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === 'UNAUTHORIZED'
    return NextResponse.json({ error: unauthorized ? 'Unauthorized.' : 'Unable to delete book.' }, { status: unauthorized ? 401 : 500 })
  }
}
