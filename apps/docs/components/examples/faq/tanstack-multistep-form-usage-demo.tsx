"use client";

import * as React from "react";
import * as z from "zod";

import {
  TanStackMultistepForm,
} from "@/components/tanstack-multistep-form";
import type { TanStackMultistepFormStep } from "@/components/tanstack-multistep-form";

const STEPS: TanStackMultistepFormStep[] = [
  {
    label: "Contact",
    schema: z.object({
      fullName: z.string().min(2, "Enter your name"),
      email: z.email("Enter a valid email"),
    }),
    defaults: { fullName: "", email: "" },
  },
  {
    label: "Account",
    schema: z.object({
      username: z.string().min(3, "Use at least 3 characters"),
      password: z.string().min(8, "Use at least 8 characters"),
    }),
    defaults: { username: "", password: "" },
  },
  {
    label: "Address",
    schema: z.object({
      street: z.string().min(3, "Enter your street address"),
      city: z.string().min(2, "Enter your city"),
    }),
    defaults: { street: "", city: "" },
  },
  {
    label: "Preferences",
    schema: z.object({
      newsletter: z.boolean().default(false),
      notes: z.string().min(5, "Add a short note"),
    }),
    defaults: { newsletter: false, notes: "" },
  },
];

export default function TanStackMultistepFormDemo() {
  const [submitted, setSubmitted] = React.useState<Record<
    number,
    Record<string, unknown>
  > | null>(null);

  return (
    <div className="grid gap-4 rounded-lg border bg-background p-6 md:grid-cols-[1fr_220px]">
      <TanStackMultistepForm steps={STEPS} onSubmit={setSubmitted} />

      <div className="rounded-md border bg-secondary/50 p-4 text-sm">
        <div className="font-medium">Submitted value</div>
        <pre className="mt-3 overflow-auto text-xs">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      </div>
    </div>
  );
}
