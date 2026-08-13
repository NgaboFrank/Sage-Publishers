import { NextRequest, NextResponse } from "next/server";

const PESAPAL_API = "https://pay.pesapal.com/v3/api";

export async function POST(request: NextRequest) {
  try {
    const setupKey = request.headers.get("x-pesapal-setup-key");

    if (
      !setupKey ||
      setupKey !== process.env.PESAPAL_SETUP_KEY
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        {
          error:
            "Pesapal credentials are not configured in Vercel.",
        },
        { status: 500 }
      );
    }

    // Get Pesapal access token
    const authResponse = await fetch(
      `${PESAPAL_API}/Auth/RequestToken`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
        }),
        cache: "no-store",
      }
    );

    const authData = await authResponse.json();

    if (!authResponse.ok || !authData.token) {
      return NextResponse.json(
        {
          error: "Pesapal authentication failed.",
          details: authData,
        },
        { status: 500 }
      );
    }

    // Register Sage Publishers IPN
    const ipnResponse = await fetch(
      `${PESAPAL_API}/URLSetup/RegisterIPN`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
        body: JSON.stringify({
          url: "https://sagepublishersltd.com/api/pesapal/ipn",
          ipn_notification_type: "GET",
        }),
        cache: "no-store",
      }
    );

    const ipnData = await ipnResponse.json();

    return NextResponse.json(ipnData, {
      status: ipnResponse.ok ? 200 : 500,
    });
  } catch (error) {
    console.error("Pesapal IPN registration error:", error);

    return NextResponse.json(
      {
        error: "Unable to register Pesapal IPN.",
      },
      { status: 500 }
    );
  }
}
