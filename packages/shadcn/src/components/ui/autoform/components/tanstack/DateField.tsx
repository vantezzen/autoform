import React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useFieldContext } from "@dual-autoform/react/tanstack-form";

const nativeDateInputStyles = `
  /* Removes native date input indicators rendered by the platform. */
  input[data-autoform-date] {
    -webkit-appearance: none;
    appearance: none;
    background-image: none;
  }

  /* Hides WebKit-specific native date controls. */
  input[data-autoform-date]::-webkit-calendar-picker-indicator,
  input[data-autoform-date]::-webkit-inner-spin-button,
  input[data-autoform-date]::-webkit-clear-button {
    display: none !important;
    -webkit-appearance: none !important;
    width: 0 !important;
    margin: 0 !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  /* Hides the custom picker on touch-primary devices. */
  @media (pointer: coarse) and (hover: none) {
    input[data-autoform-date] {
      padding-right: 0.75rem;
    }

    button[data-autoform-date-picker] {
      display: none;
    }
  }
`;

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-CA");
}

function isValidDate(date: Date | undefined) {
  return !!date && !isNaN(date.getTime());
}

function toDate(value: unknown) {
  if (value instanceof Date) return isValidDate(value) ? value : undefined;
  if (typeof value === "string" && value) {
    const date = new Date(value);
    return isValidDate(date) ? date : undefined;
  }
  return undefined;
}

export const DateField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const field = useFieldContext<Date | string>();
  const selectedDate = toDate(field.state.value);
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(selectedDate);
  const [inputValue, setInputValue] = React.useState(formatDate(selectedDate));

  React.useEffect(() => {
    setInputValue(formatDate(selectedDate));
    setMonth(selectedDate);
  }, [selectedDate?.getTime()]);

  return (
    <>
      <style>{nativeDateInputStyles}</style>
      <div className="relative">
        <Input
          id={id}
          name={field.name}
          {...inputProps}
          type="date"
          data-autoform-date
          className={`${error ? "border-destructive " : ""} pr-10 appearance-none ${
            inputProps?.className ?? ""
          }`}
          value={inputValue}
          placeholder={inputProps?.placeholder ?? "Select date"}
          onBlur={(e) => {
            field.handleBlur();
            inputProps?.onBlur?.(e);
          }}
          onChange={(e) => {
            const nextValue = e.target.value;
            const nextDate = new Date(nextValue);

            setInputValue(nextValue);

            if (isValidDate(nextDate)) {
              field.handleChange(formatDate(nextDate));
              setMonth(nextDate);
            } else if (!nextValue) {
              field.handleChange("");
            }
          }}
          onKeyDown={(e) => {
            inputProps?.onKeyDown?.(e);

            if (e.defaultPrevented) return;

            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id={`${id}-date-picker`}
              data-autoform-date-picker
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-1/2 size-8 text-muted-foreground"
              style={{ right: "0.25rem", transform: "translateY(-50%)" }}
              aria-label="Select date"
            >
              <CalendarIcon className="size-4" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={selectedDate}
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                field.handleChange(formatDate(date));
                setInputValue(formatDate(date));
                setMonth(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
