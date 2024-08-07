"use client";

import { useUser } from "@clerk/nextjs";
import type { Event } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

import { checkoutOrder } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  event: Event & {
    category: { name: string };
    organizer: { clerkId: string; firstName: string; lastName: string };
  };
}

export const CheckoutButton = ({ event }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isSignedIn, user } = useUser();
  const { toast } = useToast();

  const handleCheckout = async () => {
    setIsLoading(true);

    if (!user) {
      return;
    }

    try {
      const order = {
        clerkId: user.id,
        eventId: event.id,
        isFree: event.isFree,
        price: event.price,
        title: event.title,
      };

      const checkout = await checkoutOrder(order);

      window.location.href = checkout.url;
    } catch (error) {
      console.error(error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-3">
      {new Date(event.endDateTime) < new Date() ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {isSignedIn ? (
            <Button
              onClick={handleCheckout}
              size="lg"
              className="button sm:w-fit"
              disabled={isLoading}
            >
              {event.isFree ? "Get Ticket" : "Buy Ticket"}
            </Button>
          ) : (
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          )}
        </>
      )}
    </div>
  );
};
