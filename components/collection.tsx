"use client";

import { useUser } from "@clerk/nextjs";
import type { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Actions } from "@/components/actions";
import { Button } from "@/components/ui/button";
import { formatDateTime, formUrlQuery } from "@/lib/utils";

interface Props {
  data: (Event & {
    category: { name: string };
    organizer: { clerkId: string; firstName: string; lastName: string };
  })[];
  emptySubtitle: string;
  emptyTitle: string;
  page: number | string;
  collectionType?: "all_events" | "created_events" | "orders";
  totalPages?: number;
  urlParamName?: string;
}

export const Collection = ({
  data,
  emptySubtitle,
  emptyTitle,
  page,
  collectionType,
  totalPages = 0,
  urlParamName,
}: Props) => {
  const { user } = useUser();

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (type: "previous" | "next") => {
    const value = type === "next" ? Number(page) + 1 : Number(page) - 1;

    const url = formUrlQuery({
      key: urlParamName || "page",
      params: searchParams.toString(),
      value: value.toString(),
    });

    router.push(url, { scroll: false });
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => (
              <li key={event.id} className="flex justify-center">
                <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
                  <Link
                    href={`/events/${event.id}`}
                    style={{ backgroundImage: `url(${event.imageUrl})` }}
                    className="flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500"
                  />
                  {user?.id === event.organizer.clerkId &&
                    collectionType !== "orders" && (
                      <Actions eventId={event.id} />
                    )}
                  <div
                    className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
                    onClick={() => router.push(`/events/${event.id}`)}
                  >
                    {collectionType !== "orders" && (
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
                      {collectionType === "created_events" && (
                        <Link
                          href={`/orders?eventId=${event.id}`}
                          className="flex gap-2"
                        >
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
              </li>
            ))}
          </ul>
          {totalPages > 1 && (
            <div className="flex gap-2">
              <Button
                size="lg"
                variant="outline"
                className="w-28"
                onClick={() => handleClick("previous")}
                disabled={Number(page) <= 1}
              >
                Previous
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-28"
                onClick={() => handleClick("next")}
                disabled={Number(page) >= totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptySubtitle}</p>
        </div>
      )}
    </>
  );
};
