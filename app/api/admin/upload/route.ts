import { NextResponse } from 'next/server'
import { supabaseStorageUpload } from '../../../../lib/supabase-admin'
import { requireAdmin } from '../../../../lib/admin-auth'

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const form = await request.formData(); const file = form.get('file')
    if (!(file instanceof File)) return NextResponse.json({ error:'No image selected.' }, { status:400 })
    if (!file.type.startsWith('image/')) return NextResponse.json({ error:'Only image files are allowed.' }, { status:400 })
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error:'Image must be 10MB or smaller.' }, { status:400 })
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-')
    const path = `uploads/${Date.now()}-${safeName}`
    const url = await supabaseStorageUpload(path, file)
    return NextResponse.json({ url, path })
  } catch (error) { const unauthorized = error instanceof Error && error.message === 'UNAUTHORIZED'; return NextResponse.json({ error: unauthorized ? 'Unauthorized.' : 'Upload failed.' }, { status: unauthorized ? 401 : 500 }) }
}
