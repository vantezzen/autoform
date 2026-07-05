"use client";
import { useController } from "react-hook-form";

import * as React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
} from "@autoform/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Data ──────────────────────────────────────────────────────────────────────

interface CountryEntry {
  name: string;
  iso2: string;
  states: { name: string; state_code: string }[];
}

let _countriesPromise: Promise<CountryEntry[]> | null = null;
const fetchCountries = () =>
  (_countriesPromise ??= fetch(
    "https://countriesnow.space/api/v0.1/countries/states",
  )
    .then((r) => r.json())
    .then((j) => (j.data as CountryEntry[]) ?? [])
    .catch(() => []));

function useCountries() {
  const [countries, setCountries] = React.useState<CountryEntry[]>([]);
  React.useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const labels = React.useMemo(() => {
    const counts = new Map<string, number>();
    countries.forEach((c) => counts.set(c.name, (counts.get(c.name) ?? 0) + 1));
    return new Map(
      // Countries sharing a name (e.g. the two "Congo" entries) get iso2 appended
      countries.map((c) => [
        c.iso2,
        counts.get(c.name)! > 1 ? `${c.name} (${c.iso2})` : c.name,
      ]),
    );
  }, [countries]);

  return { countries, labels };
}

// ── CountrySelectField ────────────────────────────────────────────────────────
export function CountrySelectField({
  id,
  error,
  inputProps,
}: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  const { setValue } = useFormContext();
  const { countries, labels } = useCountries();

  return (
    <Select
      onValueChange={(iso2: string) => {
        field.onChange(iso2);
        setValue("state", "");
      }}
      value={field.value ?? ""}
      disabled={countries.length === 0}
    >
      <SelectTrigger
        id={id}
        {...inputProps}
        className={error ? "border-destructive" : ""}
      >
        <SelectValue
          placeholder={
            countries.length === 0 ? "Loading countries…" : "Select a country"
          }
        />
      </SelectTrigger>
      <SelectContent>
        {countries.map((c) => (
          <SelectItem key={c.iso2} value={c.iso2}>
            {labels.get(c.iso2) ?? c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ── StateSelectField ──────────────────────────────────────────────────────────
export function StateSelectField({
  id,
  error,
  inputProps,
}: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  const { countries } = useCountries();
  const selectedIso2: string = useWatch({ name: "country" });

  const states = React.useMemo(
    () => countries.find((c) => c.iso2 === selectedIso2)?.states ?? [],
    [countries, selectedIso2],
  );

  const placeholder = !selectedIso2
    ? "Select a country first"
    : states.length === 0
      ? "No states available"
      : "Select a state / province";

  return (
    <Select
      onValueChange={field.onChange}
      value={field.value ?? ""}
      disabled={!selectedIso2 || states.length === 0}
    >
      <SelectTrigger
        id={id}
        {...inputProps}
        className={error ? "border-destructive" : ""}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {states.map((s) => (
          <SelectItem key={s.state_code} value={s.name}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ── CouponCodeFieldWrapper ──────────────────────────────────────────────────
// Returns null (field hidden entirely) when "Have a coupon?" is unchecked.
export function CouponCodeFieldWrapper({
  children,
  label,
  id,
  error,
  parsedField,
}: FieldWrapperProps) {
  const haveCoupon = useWatch({ name: "haveCoupon" });

  if (!haveCoupon) return null;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label}
        {parsedField.required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
      {error && <div className="text-sm text-destructive">{error}</div>}
    </div>
  );
}

// ── GiftMessageField ──────────────────────────────────────────────────────────
// Always visible; editable only when "This is a gift" is checked.
export function GiftMessageField({
  id,
  error,
  inputProps,
}: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  const isGift = useWatch({ name: "isGift" });

  return (
    <Textarea
      id={id}
      placeholder="Write a gift message…"
      rows={3}
      disabled={!isGift}
      className={error ? "border-destructive" : ""}
      {...inputProps}
      {...field}
      value={field.value ?? ""}
    />
  );
}

// ── PaymentFieldWrapper ───────────────────────────────────────────────────────
// Wraps the entire payment section: renders children normally, or swaps
// them for a discount banner when the FREE100 coupon is active.
export function PaymentFieldWrapper({ children }: FieldWrapperProps) {
  const { subscribe } = useFormContext();
  const [isFree, setIsFree] = React.useState(false);

  React.useEffect(() => {
    // see react-hook-form docs for subscribe: https://react-hook-form.com/docs/useform/subscribe
    const callback = subscribe({
      name: ["couponCode", "haveCoupon"],
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        const isFreeNow =
          values.haveCoupon && values.couponCode?.toUpperCase() === "FREE100";
        setIsFree(isFreeNow);
      },
    });
    return () => callback();
  }, [subscribe]);

  if (isFree) {
    return (
      <div className="rounded-lg border border-green-500/40 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
        🎉 100% discount applied, no payment required!
      </div>
    );
  }

  return <>{children}</>;
}
