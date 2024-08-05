import Image from "next/image";
import { notFound } from "next/navigation";

import { getEventById } from "@/actions/event";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";

interface Props {
  params: { id: string };
}

const EventPage = async ({ params }: Props) => {
  const event = await getEventById(params.id);

  if (!event) {
    return notFound();
  }

  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image
          src={event.imageUrl}
          height={1000}
          width={1000}
          alt="event"
          className="h-full min-h-[300px] object-cover object-center"
        />
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
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
          </div>
          <Button>Buy Ticket</Button>
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
            <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
              {event.url}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventPage;
