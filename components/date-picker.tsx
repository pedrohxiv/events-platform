"use client";

import { format } from "date-fns";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  onChangeHandler: (value?: Date) => void;
  disabled?: boolean;
  value?: Date;
}

export const DatePicker = ({
  label,
  onChangeHandler,
  disabled,
  value,
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-start items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 hover:bg-grey-50 px-4 py-2 border-none focus-visible:ring-transparent"
          disabled={disabled}
        >
          <Image
            src="/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="filter-grey"
          />
          <span
            className={cn("p-regular-16 px-4 py-3", {
              "text-grey-500": !value,
            })}
          >
            {value ? format(value, "dd/MM/yyyy HH:mm") : label}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar value={value} onSelect={onChangeHandler} />
      </PopoverContent>
    </Popover>
  );
};
