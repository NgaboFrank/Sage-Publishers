import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../../lib/supabase-admin'

export async function GET() {
  try {
    const books = await supabaseAdmin('books?select=*&order=created_at.desc')
    return NextResponse.json({ books })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to load books.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const title = String(body.title || '').trim()
    if (!title) return NextResponse.json({ error: 'Book title is required.' }, { status: 400 })
    const books = await supabaseAdmin('books', {
      method: 'POST',
      body: JSON.stringify({
        title,
        author: String(body.author || '').trim(),
        description: String(body.description || '').trim(),
        price: Number(body.price || 0),
        currency: String(body.currency || 'RWF'),
        cover_url: body.cover_url || null,
        gallery_urls: Array.isArray(body.gallery_urls) ? body.gallery_urls : [],
        published: body.published !== false,
      }),
    })
    return NextResponse.json({ book: Array.isArray(books) ? books[0] : books })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to create book.' }, { status: 500 })
  }
}
