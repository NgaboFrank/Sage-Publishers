import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const orderTrackingId =
    searchParams.get("OrderTrackingId") ||
    searchParams.get("orderTrackingId");

  const orderNotificationType =
    searchParams.get("OrderNotificationType") ||
    searchParams.get("orderNotificationType");

  const orderMerchantReference =
    searchParams.get("OrderMerchantReference") ||
    searchParams.get("orderMerchantReference");

  console.log("Pesapal IPN received:", {
    orderTrackingId,
    orderNotificationType,
    orderMerchantReference,
  });

  return NextResponse.json({
    orderNotificationType:
      orderNotificationType || "IPNCHANGE",
    orderTrackingId: orderTrackingId || "",
    orderMerchantReference: orderMerchantReference || "",
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  let data: Record<string, unknown> = {};

  try {
    data = await request.json();
  } catch {
    const formData = await request.formData();

    formData.forEach((value, key) => {
      data[key] = value;
    });
  }

  const orderTrackingId =
    data.OrderTrackingId ||
    data.orderTrackingId ||
    "";

  const orderNotificationType =
    data.OrderNotificationType ||
    data.orderNotificationType ||
    "IPNCHANGE";

  const orderMerchantReference =
    data.OrderMerchantReference ||
    data.orderMerchantReference ||
    "";

  console.log("Pesapal IPN received:", {
    orderTrackingId,
    orderNotificationType,
    orderMerchantReference,
  });

  return NextResponse.json({
    orderNotificationType,
    orderTrackingId,
    orderMerchantReference,
    status: 200,
  });
}
