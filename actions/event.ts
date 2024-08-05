"use server";

import { db } from "@/lib/db";

interface CreateEventProps {
  data: {
    categoryId: string;
    description: string;
    endDateTime: Date;
    imageUrl: string;
    isFree: boolean;
    location: string;
    price: string;
    startDateTime: Date;
    title: string;
    url: string;
  };
  path: string;
  clerkId: string;
}

export const createEvent = async ({
  data,
  path,
  clerkId,
}: CreateEventProps) => {
  try {
    const organizer = await db.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const event = await db.event.create({
      data: {
        ...data,
        organizerId: organizer.id,
      },
    });

    return event;
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};
