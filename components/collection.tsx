import type { Event } from "@prisma/client";

import { Card } from "@/components/card";

interface Props {
  data: (Event & {
    category: { name: string };
    organizer: { clerkId: string; firstName: string; lastName: string };
  })[];
  emptySubtitle: string;
  emptyTitle: string;
  limit: number;
  page: number | string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  totalPages?: number;
  urlParamName?: string;
}

export const Collection = ({
  data,
  emptySubtitle,
  emptyTitle,
  limit,
  page,
  collectionType,
  totalPages,
  urlParamName,
}: Props) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => (
              <li key={event.id} className="flex justify-center">
                <Card
                  event={event}
                  hasOrderLink={collectionType === "Events_Organized"}
                  hideBadges={collectionType === "My_Tickets"}
                />
              </li>
            ))}
          </ul>
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
