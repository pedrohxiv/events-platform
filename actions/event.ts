"use server";

import { revalidatePath } from "next/cache";

import { getCategoryByName } from "@/actions/category";
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
  pathname: string;
  clerkId: string;
}

export const createEvent = async ({
  data,
  pathname,
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

    revalidatePath(pathname);

    return event;
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};

export const getEventById = async (id: string) => {
  try {
    if (id.length !== 24) {
      return null;
    }

    const event = await db.event.findFirst({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        organizer: {
          select: {
            clerkId: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!event) {
      return null;
    }

    return event;
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};

interface GetAllEventsProps {
  category: string;
  page: number;
  query: string;
  limit?: number;
}

export const getAllEvents = async ({
  category,
  page,
  query,
  limit = 6,
}: GetAllEventsProps) => {
  try {
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    const events = await db.event.findMany({
      where: {
        AND: [
          query ? { title: { contains: query, mode: "insensitive" } } : {},
          categoryCondition ? { categoryId: categoryCondition.id } : {},
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (Number(page) - 1) * limit,
      take: limit,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        organizer: {
          select: {
            clerkId: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      data: events,
      totalPages: Math.ceil(events.length / limit),
    };
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};

interface DeleteEventProps {
  id: string;
  pathname: string;
}

export const deleteEvent = async ({ id, pathname }: DeleteEventProps) => {
  try {
    await db.event.delete({
      where: {
        id,
      },
    });

    revalidatePath(pathname);
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};

interface UpdateEventProps {
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
  id: string;
  pathname: string;
  clerkId: string;
}

export const updateEvent = async ({
  data,
  id,
  pathname,
  clerkId,
}: UpdateEventProps) => {
  try {
    const organizer = await db.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const event = await db.event.update({
      where: {
        id,
        organizerId: organizer.id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath(pathname);

    return event;
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
};

interface GetRelatedEventsProps {
  categoryId: string;
  eventId: string;
  page: number | string;
  limit?: number;
}

export async function getRelatedEvents({
  categoryId,
  eventId,
  page,
  limit = 3,
}: GetRelatedEventsProps) {
  try {
    const events = await db.event.findMany({
      where: {
        categoryId,
        id: { not: eventId },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (Number(page) - 1) * limit,
      take: limit,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        organizer: {
          select: {
            clerkId: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      data: events,
      totalPages: Math.ceil(events.length / limit),
    };
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
}

interface GetEventsByUserProps {
  page: number;
  clerkId: string;
  limit?: number;
}

export async function getEventsByUser({
  page,
  clerkId,
  limit = 3,
}: GetEventsByUserProps) {
  try {
    const organizer = await db.user.findUnique({
      where: {
        clerkId,
      },
    });

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const events = await db.event.findMany({
      where: {
        organizerId: organizer.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (Number(page) - 1) * limit,
      take: limit,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        organizer: {
          select: {
            clerkId: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return {
      data: events,
      totalPages: Math.ceil(events.length / limit),
    };
  } catch (error) {
    console.error(error);

    throw new Error(JSON.stringify(error));
  }
}
