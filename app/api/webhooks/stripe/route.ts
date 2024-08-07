import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.messsage}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    await db.order.create({
      data: {
        stripeId: session.id,
        buyerId: session.metadata?.buyerId || "",
        eventId: session.metadata?.eventId || "",
        totalAmount: session.amount_total
          ? (session.amount_total / 100).toString()
          : "0",
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
