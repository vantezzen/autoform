"use client";
import { useController } from "react-hook-form";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CalendarIcon, CircleIcon, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import type { AutoFormFieldProps } from "@dual-autoform/react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// ── Number Stepper ────────────────────────────────────────────────────────────

export function NumberStepperField({
  id,
  inputProps,
  error,
}: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  const value = typeof field.value === "number" ? field.value : 1;
  const limits = field as { min?: number; max?: number } | undefined;

  const step = (delta: number) => {
    const min = limits?.min ?? 1;
    const max = limits?.max ?? 99;
    field.onChange(Math.min(max, Math.max(min, value + delta)));
  };

  return (
    <div
      className={cn(
        "flex h-9 w-36 items-center overflow-hidden rounded-lg border border-input shadow-xs transition-shadow focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/20",
        error && "border-destructive",
      )}
    >
      <Button
        type="button"
        onClick={() => step(-1)}
        variant="ghost"
        size="sm"
        className="h-full rounded-none rounded-l-lg border-r px-2"
        aria-label="Decrease"
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      <Input
        id={id}
        type="number"
        {...inputProps}
        {...field}
        value={value}
        onChange={(e) => field.onChange(Number(e.target.value))}
        // Hide native browser spinner arrows
        className="h-full w-full rounded-none border-0 text-center shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        type="button"
        onClick={() => step(1)}
        variant="ghost"
        size="sm"
        className="h-full rounded-none rounded-r-lg border-l px-2"
        aria-label="Increase"
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

// ── Radio Cards ───────────────────────────────────────────────────────────────

type RadioOption = { id: string; label: string; desc?: string };

export function RadioCardField({ id, error, parsedField }: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  const value = typeof field.value === "string" ? field.value : "";

  const options: RadioOption[] =
    (parsedField.fieldConfig?.customData?.options as
      | RadioOption[]
      | undefined) ??
    (parsedField.options ?? []).map(([id, label]) => ({ id, label }));

  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={field.onChange}
      className="flex flex-col gap-1.5"
    >
      {options.map((opt, i) => (
        <Label
          key={opt.id}
          htmlFor={`${id}-${i}`}
          className={cn(
            "flex cursor-pointer items-center gap-2.5 rounded-md border border-input bg-background px-3 py-2 shadow-xs transition-colors has-data-[state=checked]:border-ring/60 has-data-[state=checked]:bg-accent/40",
            error && "border-destructive",
          )}
        >
          <RadioGroupPrimitive.Item
            id={`${id}-${i}`}
            value={opt.id}
            className="aspect-square size-3.5 shrink-0 rounded-full border border-input outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <RadioGroupPrimitive.Indicator className="relative flex items-center justify-center">
              <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          <div className="flex flex-col gap-1 p-1">
            <span className="font-medium text-sm leading-none">
              {opt.label}
            </span>
            {opt.desc && (
              <span className="mt-0.5 text-xs text-muted-foreground">
                {opt.desc}
              </span>
            )}
          </div>
        </Label>
      ))}
    </RadioGroupPrimitive.Root>
  );
}

// ── Date Picker ──────────────────────────────────────────────────────────────

export function DatePickerField({ id, error }: AutoFormFieldProps) {
  const { ref, ...field } = useController({ name: id }).field;
  const [open, setOpen] = React.useState(false);

  const dateValue: Date | undefined = field.value
    ? new Date(field.value + "T00:00:00")
    : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          ref={ref}
          type="button"
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateValue && "text-muted-foreground",
            error && "border-destructive",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateValue ? format(dateValue, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={(day) => {
            field.onChange(day ? format(day, "yyyy-MM-dd") : "");
            setOpen(false);
          }}
          captionLayout="dropdown"
          startMonth={new Date(1900, 0)}
          endMonth={new Date(new Date().getFullYear() + 1, 11)}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// ── Slider ────────────────────────────────────────────────────────────────────

export function SliderField({ id, inputProps }: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  const value = typeof field.value === "number" ? field.value : 50;

  return (
    <div className="flex items-center gap-3">
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => field.onChange(Number(e.target.value))}
        className="w-full accent-primary"
        {...inputProps}
      />
      <span className="w-8 text-right text-sm tabular-nums">{value}</span>
    </div>
  );
}

// ── Color Picker ──────────────────────────────────────────────────────────────

export function ColorPickerField({ id, inputProps }: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  const color = typeof field.value === "string" ? field.value : "#6366f1";

  return (
    <div className="flex items-center gap-3">
      <img
        src="https://autoform-acp-docs.vercel.app/banana.png"
        alt="Banana"
        className="h-24 w-24 rounded-md border border-input object-cover"
      />
      <input
        id={id}
        type="color"
        value={color}
        onChange={(e) => field.onChange(e.target.value)}
        className="h-9 w-14 cursor-pointer rounded border p-0.5"
        {...inputProps}
      />
      <span className="text-sm text-muted-foreground">{color}</span>
    </div>
  );
}

// ── File Upload ───────────────────────────────────────────────────────────────

export function FileUploadField({ id }: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  const file: File | undefined = field.value;

  return (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="file"
        accept="image/*"
        className="block w-full cursor-pointer rounded border border-input bg-background text-sm file:mr-3 file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm"
        onChange={(e) => field.onChange(e.target.files?.[0])}
      />
      {file && (
        <p className="text-xs text-muted-foreground">
          Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </p>
      )}
    </div>
  );
}
