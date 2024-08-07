"use server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

interface CheckoutOrderProps {
  clerkId: string;
  eventId: string;
  isFree: boolean;
  price: string;
  title: string;
}

export const checkoutOrder = async ({
  clerkId,
  eventId,
  isFree,
  price,
  title,
}: CheckoutOrderProps) => {
  try {
    const buyer = await db.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!buyer) {
      throw new Error("Buyer not found");
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: buyer.email,
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: isFree ? 0 : Number(price) * 100,
            product_data: {
              name: title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId,
        buyerId: buyer.id,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${eventId}`,
    });

    return { url: session.url! };
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};
