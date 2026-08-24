import crypto from 'node:crypto'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const email = process.env.SAGE_ADMIN_EMAIL
const password = process.env.SAGE_ADMIN_PASSWORD
const name = process.env.SAGE_ADMIN_NAME || 'Sage Administrator'

if (!url || !key || !email || !password) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SAGE_ADMIN_EMAIL and SAGE_ADMIN_PASSWORD first.')
  process.exit(1)
}

const hash = crypto.createHash('sha256').update(password).digest('hex')
const response = await fetch(`${url}/rest/v1/admins?on_conflict=email`, {
  method: 'POST',
  headers: { apikey:key, Authorization:`Bearer ${key}`, 'Content-Type':'application/json', Prefer:'resolution=merge-duplicates,return=representation' },
  body: JSON.stringify({ email:email.toLowerCase(), password_hash:hash, name }),
})
if (!response.ok) { console.error(await response.text()); process.exit(1) }
console.log(`Admin ready: ${email}`)
