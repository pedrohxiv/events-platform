import { z } from "zod";

export const eventFormSchema = z
  .object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    categoryId: z.string().min(1, "Category is required"),
    description: z
      .string()
      .min(3, "Description must be at least 3 characters")
      .max(400, "Description must be less than 400 characters"),
    imageUrl: z.string().min(1, "Image is required"),
    location: z
      .string()
      .min(3, "Location must be at least 3 characters")
      .max(400, "Location must be less than 400 characters"),
    startDateTime: z.date({
      required_error: "Start date and time are required",
    }),
    endDateTime: z.date({ required_error: "End date and time are required" }),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().min(1, "URL is required").url("Invalid URL format"),
  })
  .refine(({ isFree, price }) => isFree || price, {
    message:
      "Either price must be specified or the event must be marked as free",
    path: ["price"],
  });
