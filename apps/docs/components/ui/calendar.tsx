"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import * as React from "react";

import { cn } from "@/lib/cn";

// ── Custom Dropdown ───────────────────────────────────────────────────────────
// react-day-picker v10's default Dropdown renders a <select> + a <span
// className={caption_label}> side-by-side, which causes the "June June 2026
// 2026" duplication when classNames conflict with its built-in CSS.
// Replacing it with a plain <select> eliminates the problem entirely.

function CalendarDropdown({
  value,
  onChange,
  options,
  "aria-label": ariaLabel,
}: {
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options?: { value: string | number; label: string; disabled?: boolean }[];
  "aria-label"?: string;
}) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={onChange}
      className={cn(
        "h-8 cursor-pointer rounded-md border border-input bg-background",
        "px-2 text-sm font-medium outline-none",
        "focus:ring-2 focus:ring-ring",
      )}
    >
      {options?.map(({ value: v, label, disabled }) => (
        <option key={v} value={v} disabled={disabled}>
          {label}
        </option>
      ))}
    </select>
  );
}

// ── Calendar ──────────────────────────────────────────────────────────────────

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-2",
        month: "flex flex-col gap-4",

        // Caption row — nav sits absolutely on the edges, content is centered
        month_caption: "relative flex h-9 items-center justify-center",
        caption_label:  "text-sm font-medium",
        dropdowns:      "flex items-center gap-2",

        // Nav spans full height/width of caption_row so buttons sit on the edges
        nav: "absolute inset-0 flex items-center justify-between",
        button_previous: cn(
          "inline-flex size-7 items-center justify-center rounded-md",
          "opacity-70 hover:opacity-100 hover:bg-accent hover:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-30",
        ),
        button_next: cn(
          "inline-flex size-7 items-center justify-center rounded-md",
          "opacity-70 hover:opacity-100 hover:bg-accent hover:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-30",
        ),

        // Grid
        month_grid: "w-full border-collapse",
        weekdays:   "flex",
        weekday:    "flex h-9 w-9 items-center justify-center text-[0.8rem] font-normal text-muted-foreground",
        week:       "mt-2 flex w-full",

        // Day cells
        day: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day_button: cn(
          "inline-flex size-9 items-center justify-center rounded-md text-sm font-normal",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
        ),

        // States
        selected: "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        today:    "[&>button]:bg-accent [&>button]:text-accent-foreground",
        outside:  "opacity-50",
        disabled: "[&>button]:opacity-50",
        hidden:   "invisible",

        ...classNames,
      }}
      components={{
        // Replace the default Dropdown (which renders select + caption_label span)
        // with a plain styled <select> only
        Dropdown: CalendarDropdown,
        // Use lucide chevrons for the nav arrows
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          ),
      }}
      {...props}
    />
  );
}
