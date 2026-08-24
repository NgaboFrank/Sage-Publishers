const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

function getSupabaseUrl() {
  if (!rawSupabaseUrl) throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing.')
  try {
    const url = new URL(rawSupabaseUrl)
    // Accept either the normal project URL or an accidentally copied API URL.
    url.pathname = ''
    url.search = ''
    url.hash = ''
    return url.toString().replace(/\/$/, '')
  } catch {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not a valid Supabase project URL.')
  }
}

function assertConfig() {
  getSupabaseUrl()
  if (!SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing.')
}

export async function supabaseAdmin<T = unknown>(path: string, init: RequestInit = {}) {
  const baseUrl = getSupabaseUrl()
  if (!SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing.')
  const cleanPath = path.replace(/^\/+/, '')
  const response = await fetch(`${baseUrl}/rest/v1/${cleanPath}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(init.headers || {}),
    },
    cache: 'no-store',
  })

  const text = await response.text()
  let data: unknown = null
  try { data = text ? JSON.parse(text) : null } catch { data = text }
  if (!response.ok) {
    const message = typeof data === 'object' && data && 'message' in data
      ? String((data as {message: unknown}).message)
      : `Supabase request failed (${response.status})`
    throw new Error(message)
  }
  return data as T
}

export async function supabaseStorageUpload(filePath: string, file: File) {
  assertConfig()
  const baseUrl = getSupabaseUrl()
  const safePath = filePath.split('/').map(encodeURIComponent).join('/')
  const response = await fetch(`${baseUrl}/storage/v1/object/site-media/${safePath}`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: Buffer.from(await file.arrayBuffer()),
    cache: 'no-store',
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Storage upload failed (${response.status}): ${text}`)
  }
  return `${baseUrl}/storage/v1/object/public/site-media/${safePath}`
}

export async function supabaseStorageDelete(filePath: string) {
  assertConfig()
  const baseUrl = getSupabaseUrl()
  const response = await fetch(`${baseUrl}/storage/v1/object/site-media`, {
    method: 'DELETE',
    headers: {
      apikey: SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prefixes: [filePath] }),
    cache: 'no-store',
  })
  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Storage delete failed (${response.status}): ${text}`)
  }
}
