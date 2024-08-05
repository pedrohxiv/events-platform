"use client";

import { format, setHours, setMinutes } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  value?: Date;
  onSelect: (value?: Date | undefined) => void;
};

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  onSelect,
  value,
  ...props
}: CalendarProps) => {
  const timeValue = value ? format(value, "HH:mm") : "00:00";

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;

    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));

    if (isNaN(hours) || isNaN(minutes)) {
      onSelect(undefined);

      return;
    }

    if (!value) {
      const now = new Date();

      const newDate = setHours(setMinutes(now, minutes), hours);

      onSelect(newDate);

      return;
    }

    const selectedDate = setHours(setMinutes(value, minutes), hours);

    onSelect(selectedDate);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      onSelect(date);

      return;
    }

    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );

    onSelect(newDate);
  };

  return (
    <>
      <DayPicker
        mode="single"
        selected={value}
        onSelect={handleDaySelect}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
      />
      <Separator />
      <div className="flex h-12 w-full justify-center items-center gap-1">
        <Image src="/icons/clock.svg" height={24} width={24} alt="clock" />
        <input
          type="time"
          value={timeValue}
          onChange={handleTimeChange}
          className="focus:outline-offset-[3px] rounded-md cursor-text bg-transparent"
        />
      </div>
    </>
  );
};

Calendar.displayName = "Calendar";

export { Calendar };
