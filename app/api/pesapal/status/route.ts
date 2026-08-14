import { NextRequest, NextResponse } from 'next/server'

const PESAPAL_API = 'https://pay.pesapal.com/v3/api'

export async function GET(request: NextRequest) {
  try {
    const trackingId = request.nextUrl.searchParams.get(
      'orderTrackingId'
    )

    if (!trackingId) {
      return NextResponse.json(
        { error: 'Order tracking ID is missing.' },
        { status: 400 }
      )
    }

    const consumerKey = process.env.PESAPAL_CONSUMER_KEY
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        {
          error:
            'Pesapal credentials are not configured on the server.',
        },
        { status: 500 }
      )
    }

    // Authenticate with Pesapal
    const authResponse = await fetch(
      `${PESAPAL_API}/Auth/RequestToken`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
        }),
        cache: 'no-store',
      }
    )

    const authData = await authResponse.json()

    if (!authResponse.ok || !authData.token) {
      console.error(
        'Pesapal authentication error:',
        authData
      )

      return NextResponse.json(
        {
          error:
            authData?.error?.message ||
            authData?.message ||
            'Pesapal authentication failed.',
        },
        { status: 502 }
      )
    }

    const token = authData.token

    // Check payment status with Pesapal
    const statusResponse = await fetch(
      `${PESAPAL_API}/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(
        trackingId
      )}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    )

    const statusData = await statusResponse.json()

    if (!statusResponse.ok) {
      console.error(
        'Pesapal status error:',
        statusData
      )

      return NextResponse.json(
        {
          error:
            statusData?.error?.message ||
            statusData?.message ||
            'Unable to check payment status.',
        },
        { status: 502 }
      )
    }

    return NextResponse.json(statusData)
  } catch (error) {
    console.error(
      'Pesapal status API error:',
      error
    )

    return NextResponse.json(
      {
        error: 'Unable to verify the payment.',
      },
      { status: 500 }
    )
  }
}
