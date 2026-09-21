import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase-admin'

const HOME_KEYS = [
  'home_slide_breeze',
  'home_slide_animal_tales',
  'home_slide_animal_tales_fr',
]

export async function GET() {
  try {
    const keys = HOME_KEYS.join(',')
    const content = await supabaseAdmin(`site_content?select=content_key,image_url&content_key=in.(${keys})`)
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ content: [] })
  }
}
