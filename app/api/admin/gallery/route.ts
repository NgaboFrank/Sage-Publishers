import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../../lib/supabase-admin'
import { requireAdmin } from '../../../../../lib/admin-auth'

type GalleryItem = { src: string; alt: string; span: string }
const KEY = 'gallery_items'

export async function GET() {
  try {
    await requireAdmin()
    const rows = await supabaseAdmin(`site_content?content_key=eq.${KEY}&select=value`)
    const value = rows?.[0]?.value
    let items: GalleryItem[] = []
    try { items = value ? JSON.parse(value) : [] } catch { items = [] }
    return NextResponse.json({ items })
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === 'UNAUTHORIZED'
    return NextResponse.json({ error: unauthorized ? 'Unauthorized.' : 'Unable to load gallery.' }, { status: unauthorized ? 401 : 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const body = await request.json()
    const items = Array.isArray(body.items) ? body.items : []
    const clean = items
      .filter((item: any) => item && typeof item.src === 'string' && item.src.trim())
      .map((item: any) => ({ src: item.src.trim(), alt: String(item.alt || 'Sage Publishers gallery image'), span: String(item.span || '') }))
    const result = await supabaseAdmin('site_content?on_conflict=content_key', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify({ content_key: KEY, value: JSON.stringify(clean), image_url: null, updated_at: new Date().toISOString() }),
    })
    return NextResponse.json({ items: clean, content: result })
  } catch (error) {
    const unauthorized = error instanceof Error && error.message === 'UNAUTHORIZED'
    return NextResponse.json({ error: unauthorized ? 'Unauthorized.' : 'Unable to save gallery.' }, { status: unauthorized ? 401 : 500 })
  }
}
