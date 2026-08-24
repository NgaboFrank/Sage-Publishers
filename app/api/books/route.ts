import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase-admin'

export async function GET() {
  try {
    const books = await supabaseAdmin('books?select=id,title,author,description,price,currency,cover_url,gallery_urls&published=eq.true&order=created_at.desc')
    return NextResponse.json({ books })
  } catch (error) {
    console.error('Public books API error:', error)
    return NextResponse.json({ error: 'Unable to load books.' }, { status: 500 })
  }
}
