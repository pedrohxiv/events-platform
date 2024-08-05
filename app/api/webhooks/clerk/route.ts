import type { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

import { db } from "@/lib/db";

export async function POST(req: Request) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();

  const body = JSON.stringify(payload);

  const webhook = new Webhook(CLERK_WEBHOOK_SECRET);

  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);

    return new Response("Error occured", { status: 400 });
  }

  if (event.type === "user.created") {
    const { id, email_addresses, username, first_name, last_name, image_url } =
      event.data;

    await db.user.create({
      data: {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username || "",
        firstName: first_name || "",
        lastName: last_name || "",
        imageUrl: image_url,
      },
    });
  }

  if (event.type === "user.deleted") {
    const { id } = event.data;

    await db.user.delete({
      where: {
        clerkId: id,
      },
    });
  }

  if (event.type === "user.updated") {
    const { id, username, first_name, last_name, image_url } = event.data;

    const currentUser = await db.user.findUnique({
      where: {
        clerkId: id,
      },
    });

    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }

    await db.user.update({
      where: {
        clerkId: id,
      },
      data: {
        username: username || "",
        firstName: first_name || "",
        lastName: last_name || "",
        imageUrl: image_url,
      },
    });
  }

  return new Response("", { status: 200 });
}
