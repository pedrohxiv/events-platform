import Image from "next/image";
import Link from "next/link";

import { getAllEvents } from "@/actions/event";
import { CategoryFilter } from "@/components/category-filter";
import { Collection } from "@/components/collection";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const RootPage = async ({ searchParams }: Props) => {
  const category = (searchParams?.category as string) || "";
  const query = (searchParams?.query as string) || "";
  const page = Number(searchParams?.page) || 1;

  const events = await getAllEvents({ category, page, query });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button asChild size="lg" className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>
          <Image
            src="/images/hero.png"
            height={1000}
            width={1000}
            alt="hero"
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>
        <Collection
          data={events.data}
          emptyTitle="No Events Found"
          emptySubtitle="Come back later"
          collectionType="all_events"
          page={page}
          totalPages={events.totalPages}
        />
      </section>
    </>
  );
};

export default RootPage;
