"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { deleteEvent } from "@/actions/event";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  eventId: string;
}

export const Actions = ({ eventId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const handleDeleteEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await deleteEvent({ id: eventId, pathname });

    setIsOpen(false);
  };

  return (
    <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
      <Link href={`/events/${eventId}/update`}>
        <Image src="/icons/edit.svg" height={20} width={20} alt="edit" />
      </Link>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Image src="/icons/delete.svg" height={20} width={20} alt="delete" />
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription className="p-regular-16 text-grey-600">
              This will permanently delete this event.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDeleteEvent}>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
