"use client";

import { useSession } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createEvent } from "@/actions/event";
import { DatePicker } from "@/components/date-picker";
import { Dropdown } from "@/components/dropdown";
import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { eventDefaultValues } from "@/lib/constants";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { eventFormSchema } from "@/lib/validators";

interface Props {
  type: "Create" | "Update";
}

export const EventForm = ({ type }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useSession();
  const { toast } = useToast();
  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    setIsLoading(true);

    if (!session?.user) {
      return;
    }

    let imageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      imageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const event = await createEvent({
          data: { ...values, imageUrl },
          path: "/profile",
          clerkId: session.user.id,
        });

        if (event) {
          form.reset();

          router.push(`/events/${event.id}`);
        }
      } catch (error) {
        console.error(error);

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Event title"
                    {...field}
                    className="input-field"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Event description"
                    {...field}
                    className="textarea rounded-2xl resize-none"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    imageUrl={field.value}
                    onFieldChange={field.onChange}
                    setFiles={setFiles}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div
                    className={cn(
                      "flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2",
                      {
                        "cursor-not-allowed opacity-50": isLoading,
                      }
                    )}
                  >
                    <Image
                      src="/icons/location-grey.svg"
                      height={24}
                      width={24}
                      alt="location"
                    />
                    <Input
                      placeholder="Event location or online"
                      {...field}
                      className="input-field disabled:opacity-100"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DatePicker
                    label="Start date"
                    onChangeHandler={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <DatePicker
                    label="End date"
                    onChangeHandler={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div
                    className={cn(
                      "flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2",
                      {
                        "cursor-not-allowed opacity-50": isLoading,
                      }
                    )}
                  >
                    <Image
                      src="/icons/dollar.svg"
                      height={24}
                      width={24}
                      alt="dollar"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-100"
                      disabled={form.getValues("isFree") || isLoading}
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                              <label
                                htmlFor="isFree"
                                className={cn(
                                  "whitespace-nowrap pr-3 text-grey-500 cursor-pointer leading-none",
                                  {
                                    "cursor-not-allowed": isLoading,
                                  }
                                )}
                              >
                                Free Ticket
                              </label>
                              <Checkbox
                                id="isFree"
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                className="mr-2 h-5 w-5 border-2 border-primary-500 focus-visible:ring-transparent"
                                disabled={isLoading}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div
                    className={cn(
                      "flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2",
                      {
                        "cursor-not-allowed opacity-50": isLoading,
                      }
                    )}
                  >
                    <Image
                      src="/icons/link.svg"
                      height={24}
                      width={24}
                      alt="link"
                    />
                    <Input
                      placeholder="URL"
                      {...field}
                      className="input-field disabled:opacity-100"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="button col-span-2 w-full"
          disabled={isLoading}
        >
          {isLoading && (
            <Image
              src="/icons/loader.svg"
              height={24}
              width={24}
              alt="loader"
              className="animate-spin mr-2"
            />
          )}
          {isLoading ? "Submitting..." : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};
