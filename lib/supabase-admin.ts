const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function assertConfig() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error('Supabase server configuration is missing.')
  }
}

export async function supabaseAdmin<T = unknown>(path: string, init: RequestInit = {}) {
  assertConfig()
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_ROLE_KEY!,
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
    const message = typeof data === 'object' && data && 'message' in data ? String((data as {message: unknown}).message) : `Supabase request failed (${response.status})`
    throw new Error(message)
  }
  return data as T
}

export async function supabaseStorageUpload(filePath: string, file: File) {
  assertConfig()
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/site-media/${filePath}`, {
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
  if (!response.ok) throw new Error(`Storage upload failed (${response.status})`)
  return `${SUPABASE_URL}/storage/v1/object/public/site-media/${filePath}`
}

export async function supabaseStorageDelete(filePath: string) {
  assertConfig()
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/site-media`, {
    method: 'DELETE',
    headers: {
      apikey: SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prefixes: [filePath] }),
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`Storage delete failed (${response.status})`)
}
