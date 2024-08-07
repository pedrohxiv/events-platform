import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getEventsByUser } from "@/actions/event";
import { getOrdersByUser } from "@/actions/order";
import { Collection } from "@/components/collection";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProfilePage = async ({ searchParams }: Props) => {
  const eventsPage = Number(searchParams?.eventsPage) || 1;
  const ordersPage = Number(searchParams?.ordersPage) || 1;

  const user = await currentUser();

  if (!user) {
    return notFound();
  }

  const events = await getEventsByUser({ page: eventsPage, clerkId: user.id });
  const orders = await getOrdersByUser({ page: ordersPage, clerkId: user.id });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={orders.data.map((order) => order.event)}
          emptyTitle="No Event Tickets Purchased Yet"
          emptySubtitle="No worries - plenty of exciting events to explore!"
          collectionType="orders"
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders.totalPages}
        />
      </section>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={events.data}
          emptyTitle="No Event Have Been Created Yet"
          emptySubtitle="Go create some now"
          collectionType="created_events"
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={events.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;
