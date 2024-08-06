import { notFound } from "next/navigation";

import { getEventById } from "@/actions/event";
import { EventForm } from "@/components/event-form";

interface Props {
  params: { id: string };
}

const UpdateEventPage = async ({ params }: Props) => {
  const event = await getEventById(params.id);

  if (!event) {
    return notFound();
  }

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm type="update" data={event} />
      </div>
    </>
  );
};

export default UpdateEventPage;
