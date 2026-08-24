import crypto from 'node:crypto'
import { cookies } from 'next/headers'
import { supabaseAdmin } from './supabase-admin'

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value) throw new Error('ADMIN_SESSION_SECRET is not configured.')
  return value
}

export function makeAdminToken(adminId: string) {
  return crypto.createHmac('sha256', secret()).update(adminId).digest('hex')
}

export async function getAdmin() {
  const store = await cookies()
  const adminId = store.get('sage_admin_id')?.value
  const token = store.get('sage_admin')?.value
  if (!adminId || !token) return null
  const expected = makeAdminToken(adminId)
  if (!crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected))) return null
  const rows = await supabaseAdmin<Array<{id:string;email:string;name:string}>>(`admins?select=id,email,name&id=eq.${encodeURIComponent(adminId)}&limit=1`)
  return rows[0] || null
}

export async function requireAdmin() {
  const admin = await getAdmin()
  if (!admin) throw new Error('UNAUTHORIZED')
  return admin
}
