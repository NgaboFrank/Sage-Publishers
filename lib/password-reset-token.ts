import crypto from 'node:crypto'

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value) throw new Error('ADMIN_SESSION_SECRET is not configured.')
  return value
}

function sign(value: string) {
  return crypto.createHmac('sha256', secret()).update(value).digest('base64url')
}

export function makePasswordResetToken(adminId: string, passwordHash: string, expiresAt: number) {
  const payload = `${adminId}.${expiresAt}.${passwordHash}`
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`
}

export function verifyPasswordResetToken(token: string) {
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null
  let payload = ''
  try { payload = Buffer.from(encoded, 'base64url').toString('utf8') } catch { return null }
  const expected = sign(payload)
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null
  const [adminId, expiresRaw, passwordHash] = payload.split('.')
  const expiresAt = Number(expiresRaw)
  if (!adminId || !passwordHash || !Number.isFinite(expiresAt) || Date.now() > expiresAt) return null
  return { adminId, passwordHash, expiresAt }
}
