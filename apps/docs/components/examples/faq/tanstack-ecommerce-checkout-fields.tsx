"use client";

import * as React from "react";
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
} from "@acp-autoform/react";
import {
  useFieldContext,
  useFormContext,
} from "@acp-autoform/react/tanstack-form";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountryEntry {
  name: string;
  iso2: string;
  states: { name: string; state_code: string }[];
}

let countriesPromise: Promise<CountryEntry[]> | null = null;
const fetchCountries = () =>
  (countriesPromise ??= fetch(
    "https://countriesnow.space/api/v0.1/countries/states",
  )
    .then((response) => response.json())
    .then((json) => (json.data as CountryEntry[]) ?? [])
    .catch(() => []));

function useCountries() {
  const [countries, setCountries] = React.useState<CountryEntry[]>([]);

  React.useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const labels = React.useMemo(() => {
    const counts = new Map<string, number>();
    countries.forEach((country) =>
      counts.set(country.name, (counts.get(country.name) ?? 0) + 1),
    );

    return new Map(
      countries.map((country) => [
        country.iso2,
        counts.get(country.name)! > 1
          ? `${country.name} (${country.iso2})`
          : country.name,
      ]),
    );
  }, [countries]);

  return { countries, labels };
}

export function CountrySelectField({
  id,
  error,
  inputProps,
}: AutoFormFieldProps) {
  const field = useFieldContext<string>();
  const form = useFormContext();
  const formApi = form as any;
  const { countries, labels } = useCountries();

  return (
    <Select
      onValueChange={(iso2) => {
        field.handleChange(iso2);
        formApi.setFieldValue("state", "");
      }}
      value={field.state.value ?? ""}
      disabled={countries.length === 0}
      {...inputProps}
    >
      <SelectTrigger id={id} className={error ? "border-destructive" : ""}>
        <SelectValue
          placeholder={
            countries.length === 0 ? "Loading countries..." : "Select a country"
          }
        />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.iso2} value={country.iso2}>
            {labels.get(country.iso2) ?? country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function StateSelectField({
  id,
  error,
  inputProps,
}: AutoFormFieldProps) {
  const field = useFieldContext<string>();
  const form = useFormContext();
  const { countries } = useCountries();

  return (
    <form.Subscribe selector={(state) => state.values.country}>
      {(selectedIso2) => {
        const states =
          countries.find((country) => country.iso2 === selectedIso2)?.states ??
          [];
        const placeholder = !selectedIso2
          ? "Select a country first"
          : states.length === 0
            ? "No states available"
            : "Select a state / province";

        return (
          <Select
            onValueChange={field.handleChange}
            value={field.state.value ?? ""}
            disabled={!selectedIso2 || states.length === 0}
            {...inputProps}
          >
            <SelectTrigger
              id={id}
              className={error ? "border-destructive" : ""}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.state_code} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    </form.Subscribe>
  );
}

export function CouponCodeFieldWrapper({
  children,
  label,
  id,
  error,
  parsedField,
}: FieldWrapperProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.values.haveCoupon}>
      {(haveCoupon) =>
        haveCoupon ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor={id}>
              {label}
              {parsedField.required && (
                <span className="text-destructive"> *</span>
              )}
            </Label>
            {children}
            {error && <div className="text-sm text-destructive">{error}</div>}
          </div>
        ) : null
      }
    </form.Subscribe>
  );
}

export function GiftMessageField({
  id,
  error,
  inputProps,
}: AutoFormFieldProps) {
  const field = useFieldContext<string>();
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.values.isGift}>
      {(isGift) => (
        <Textarea
          id={id}
          placeholder="Write a gift message..."
          rows={3}
          disabled={!isGift}
          className={error ? "border-destructive" : ""}
          {...inputProps}
          value={field.state.value ?? ""}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
        />
      )}
    </form.Subscribe>
  );
}

export function PaymentFieldWrapper({ children }: FieldWrapperProps) {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => {
        const values = state.values as {
          haveCoupon?: boolean;
          couponCode?: string;
        };

        return (
          values.haveCoupon && values.couponCode?.toUpperCase() === "FREE100"
        );
      }}
    >
      {(isFree) =>
        isFree ? (
          <div className="rounded-lg border border-green-500/40 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
            100% discount applied, no payment required.
          </div>
        ) : (
          <>{children}</>
        )
      }
    </form.Subscribe>
  );
}
