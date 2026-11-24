"use client";

import * as React from "react";
import { fieldConfig, ZodProvider } from "@autoform/zod";
import * as z from "zod";

import { AutoForm } from "@/components/ui/autoform/tanstack-form";
import {
  ColorPickerField,
  DatePickerField,
  FileUploadField,
  NumberStepperField,
  RadioCardField,
  SliderField,
} from "@/components/tanstack-custom-field-components";
import { ArrayTableWrapper } from "@/components/tanstack-array-table-wrapper";

const schema = z.object({
  quantity: z
    .number()
    .min(1)
    .max(99)
    .default(1)
    .describe("Quantity")
    .check(fieldConfig({ fieldType: "numberStepper" })),

  themeColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Pick a valid color")
    .default("#6366f1")
    .describe("Find the color")
    .check(fieldConfig({ fieldType: "colorPicker" })),

  birthdate: z
    .string()
    .min(1, "Pick a date")
    .describe("Birthdate")
    .check(fieldConfig({ fieldType: "dateTime" })),

  avatar: z
    .instanceof(File)
    .optional()
    .describe("Profile picture")
    .check(fieldConfig({ fieldType: "fileUpload" })),

  volume: z
    .number()
    .min(0)
    .max(100)
    .default(50)
    .check(fieldConfig({ fieldType: "slider" })),

  plan: z
    .enum(["starter", "pro", "enterprise"])
    .default("starter")
    .describe("Plan")
    .check(
      fieldConfig({
        fieldType: "radioCard",
        customData: {
          options: [
            { id: "starter", label: "Starter", desc: "Up to 3 projects" },
            { id: "pro", label: "Pro", desc: "Up to 100 projects" },
            { id: "enterprise", label: "Enterprise", desc: "Custom limits" },
          ],
        },
      }),
    ),

  services: z
    .array(
      z.object({
        service: z
          .string({ error: "Name the service" })
          .min(1, "Name the service")
          .describe("Service"),
        tier: z
          .enum(["Hobby", "Pro", "Enterprise"])
          .default("Hobby")
          .describe("Tier"),
        created: z.iso
          .date({ error: "Pick a date" })
          .describe("Created")
          .check(fieldConfig({ fieldType: "date" })),
        live: z.boolean().default(false).describe("Live"),
      }),
    )
    .min(1, "Add at least one service")
    .default([
      { service: "GitHub", tier: "Pro", created: "2026-11-02", live: true },
      {
        service: "Database",
        tier: "Enterprise",
        created: "2026-11-05",
        live: true,
      },
      { service: "VPS", tier: "Hobby", created: "2026-11-09", live: false },
      { service: "Sandbox", tier: "Hobby", created: "2026-11-12", live: true },
    ])
    .describe("Services")
    .check(fieldConfig({ arrayWrapper: ArrayTableWrapper })),
});

const schemaProvider = new ZodProvider(schema);

type FormValues = z.infer<typeof schema>;

export function TanStackCustomFieldsDemo() {
  const [result, setResult] = React.useState<FormValues | null>(null);

  return (
    <div className="space-y-6 rounded-lg border bg-background p-6">
      <AutoForm
        schema={schemaProvider}
        formComponents={{
          numberStepper: NumberStepperField,
          radioCard: RadioCardField,
          dateTime: DatePickerField,
          slider: SliderField,
          colorPicker: ColorPickerField,
          fileUpload: FileUploadField,
        }}
        formProps={{ className: "flex flex-col gap-6" }}
        onSubmit={(data) => setResult(data)}
        withSubmit
      />

      <div className="rounded-md border bg-secondary/50 p-4 text-sm">
        <div className="mb-2 font-medium">Submitted value</div>
        <pre className="overflow-auto text-xs">
          {result
            ? JSON.stringify(
                {
                  quantity: result.quantity,
                  plan: result.plan,
                  birthdate: result.birthdate,
                  volume: result.volume,
                  themeColor: result.themeColor,
                  avatar: result.avatar?.name ?? null,
                  services: result.services,
                },
                null,
                2,
              )
            : "null"}
        </pre>
      </div>
    </div>
  );
}
