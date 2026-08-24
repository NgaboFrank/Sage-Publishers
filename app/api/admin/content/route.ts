import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-admin'

export async function GET() {
  try {
    const content = await supabaseAdmin('site_content?select=*&order=content_key.asc')
    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load content.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const contentKey = String(body.content_key || '').trim()
    if (!contentKey) return NextResponse.json({ error: 'Content key is required.' }, { status: 400 })
    const result = await supabaseAdmin('site_content?on_conflict=content_key', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
      body: JSON.stringify({ content_key: contentKey, value: String(body.value || ''), image_url: body.image_url || null, updated_at: new Date().toISOString() }),
    })
    return NextResponse.json({ content: result })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save content.' }, { status: 500 })
  }
}
