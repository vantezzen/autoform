import React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useFieldContext } from "@dual-autoform/react/tanstack-form";

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
    <InputGroup>
      <InputGroupInput
        id={id}
        name={field.name}
        {...inputProps}
        type="date"
        className={`appearance-none [&::-webkit-calendar-picker-indicator]:pointer-events-none [&::-webkit-calendar-picker-indicator]:opacity-0 ${
          inputProps?.className ?? ""
        }`}
        aria-invalid={!!error || inputProps?.["aria-invalid"]}
        value={inputValue}
        placeholder={inputProps?.placeholder ?? "2025-06-01"}
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
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <InputGroupButton
              id={`${id}-date-picker`}
              variant="ghost"
              size="icon-xs"
              aria-label="Select date"
            >
              <CalendarIcon className="size-4" />
              <span className="sr-only">Select date</span>
            </InputGroupButton>
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
      </InputGroupAddon>
    </InputGroup>
  );
};
