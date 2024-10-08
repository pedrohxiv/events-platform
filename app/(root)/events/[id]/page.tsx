import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getEventById, getRelatedEvents } from "@/actions/event";
import { Actions } from "@/components/actions";
import { CheckoutButton } from "@/components/checkout-button";
import { Collection } from "@/components/collection";
import { formatDateTime } from "@/lib/utils";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const EventPage = async ({ params, searchParams }: Props) => {
  const page = Number(searchParams?.page) || 1;

  const user = await currentUser();

  const event = await getEventById(params.id);

  if (!event) {
    return notFound();
  }

  const relatedEvents = await getRelatedEvents({
    categoryId: event.categoryId,
    eventId: event.id,
    page,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            height={1000}
            width={1000}
            alt="event"
            className="h-full min-h-[300px] object-cover object-center"
          />
          <div className="relative flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="relative flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{" "}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
              {user?.id === event.organizer.clerkId && (
                <Actions eventId={event.id} />
              )}
            </div>
            <CheckoutButton event={event} />
            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-3">
                <Image
                  src="/icons/calendar.svg"
                  height={32}
                  width={32}
                  alt="calendar"
                />
                <div className="flex flex-wrap items-center">
                  <p className="p-medium-16 lg:p-regular-18">
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly} /{" "}
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/location.svg"
                  height={32}
                  width={32}
                  alt="location"
                />
                <p className="p-medium-16 lg:p-regular-18">{event.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">What You&apos;ll Learn:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <div className="flex flex-row items-center gap-2 text-left">
                <p className="p-bold-20 text-grey-600 flex-shrink-0">
                  Read more about:
                </p>
                <Link
                  href={event.url}
                  target="_blank"
                  className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline cursor-pointer"
                >
                  {event.url}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>
        <Collection
          data={relatedEvents.data}
          emptyTitle="No Events Found"
          emptySubtitle="Come back later"
          collectionType="all_events"
          page={page}
          totalPages={relatedEvents.totalPages}
        />
      </section>
    </>
  );
};

export default EventPage;
