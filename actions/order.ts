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

interface GetOrdersByUserProps {
  page: number;
  clerkId: string;
  limit?: number;
}

export async function getOrdersByUser({
  page,
  clerkId,
  limit = 3,
}: GetOrdersByUserProps) {
  try {
    const buyer = await db.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!buyer) {
      throw new Error("Buyer not found");
    }

    const orders = await db.order.findMany({
      where: {
        buyerId: buyer.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (Number(page) - 1) * limit,
      take: limit,
      include: {
        event: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
            organizer: {
              select: {
                clerkId: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return {
      data: orders,
      totalPages: Math.ceil(orders.length / limit),
    };
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
}

interface GetOrdersByEventProps {
  eventId: string;
  search: string;
}

export async function getOrdersByEvent({
  eventId,
  search,
}: GetOrdersByEventProps) {
  try {
    if (!eventId) {
      throw new Error("Event ID is required");
    }

    const orders = await db.order.findMany({
      where: {
        eventId,
        buyer: {
          OR: [
            { firstName: { contains: search, mode: "insensitive" } },
            { lastName: { contains: search, mode: "insensitive" } },
          ],
        },
      },
      include: {
        buyer: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return orders;
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
}
