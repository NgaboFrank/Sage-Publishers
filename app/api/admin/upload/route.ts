import { NextResponse } from 'next/server'
import { supabaseStorageUpload } from '../../../../lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error: 'No image selected.' }, { status: 400 })
    if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Only image files are allowed.' }, { status: 400 })
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Image must be 10MB or smaller.' }, { status: 400 })
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-')
    const path = `uploads/${Date.now()}-${safeName}`
    const url = await supabaseStorageUpload(path, file)
    return NextResponse.json({ url, path })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed.' }, { status: 500 })
  }
}
