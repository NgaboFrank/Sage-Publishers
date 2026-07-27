import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim()

  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: 'Email service is not configured.' },
      { status: 500 },
    )
  }

  let body: { name?: string; email?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const message = (body.message ?? '').trim()

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: 'Please fill in all fields.' },
      { status: 400 },
    )
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Web3Forms is behind Cloudflare, which blocks requests with no
        // browser User-Agent. A standard UA lets the server-side call through.
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Message from ${name} - The Breeze of the Forest`,
        from_name: 'The Breeze of the Forest',
        name,
        email,
        message,
        replyto: email,
      }),
    })

    const data = (await res.json().catch(() => ({}))) as { success?: boolean }

    if (!res.ok || !data.success) {
      return NextResponse.json(
        { success: false, message: 'Could not send your message. Please try again.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true, message: 'Message sent.' })
  } catch {
    return NextResponse.json(
      { success: false, message: 'Could not send your message. Please try again.' },
      { status: 502 },
    )
  }
}
