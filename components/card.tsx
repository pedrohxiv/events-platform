"use client";

import { useUser } from "@clerk/nextjs";
import type { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { Actions } from "@/components/actions";
import { formatDateTime } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  event: Event & {
    category: { name: string };
    organizer: { clerkId: string; firstName: string; lastName: string };
  };
  hasOrderLink?: boolean;
  hideBadges?: boolean;
}

export const Card = ({ event, hasOrderLink, hideBadges }: Props) => {
  const { user } = useUser();

  const router = useRouter();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link
        href={`/events/${event.id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
      />
      {user?.id === event.organizer.clerkId && !hideBadges && (
        <Actions eventId={event.id} />
      )}
      <div
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
        onClick={() => router.push(`/events/${event.id}`)}
      >
        {!hideBadges && (
          <div className="flex gap-2">
            <p className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-600">
              {event.isFree ? "FREE" : `$${event.price}`}
            </p>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}
        <p className="p-medium-16 md:p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
          {event.title}
        </p>
        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          {hasOrderLink && (
            <Link href={`/orders?eventId=${event.id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/icons/arrow.svg"
                height={10}
                width={10}
                alt="arrow"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
