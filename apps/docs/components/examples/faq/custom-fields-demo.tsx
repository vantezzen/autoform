"use client";

import * as React from "react";
import { fieldConfig, ZodProvider } from "@acp-autoform/zod";
import * as z from "zod";

import { AutoForm } from "@/components/ui/autoform";
import {
  ColorPickerField,
  DatePickerField,
  FileUploadField,
  NumberStepperField,
  RadioCardField,
  SliderField,
} from "@/components/custom-field-components";

// â”€â”€ Schema â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    .describe("Theme color")
    .check(fieldConfig({ fieldType: "colorPicker" })),

  scheduledDate: z
    .string()
    .min(1, "Pick a date")
    .describe("Scheduled date")
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
    .describe("Volume (0 â€“ 100)")
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
});

const schemaProvider = new ZodProvider(schema);

// â”€â”€ Demo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type FormValues = z.infer<typeof schema>;

// Wider gap between fields than the default gap-4
const FormWithSpacing = React.forwardRef<
  HTMLFormElement,
  React.ComponentProps<"form">
>(({ children, ...props }, ref) => (
  <form ref={ref} className="flex flex-col gap-6" {...props}>
    {children}
  </form>
));
FormWithSpacing.displayName = "FormWithSpacing";

export function CustomFieldsDemo() {
  const [result, setResult] = React.useState<FormValues | null>(null);

  return (
    <div className="rounded-lg border bg-background p-6 space-y-6">
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
        uiComponents={{ Form: FormWithSpacing }}
        onSubmit={(data) => setResult(data)}
        withSubmit
      />

      <div className="rounded-md border bg-secondary/50 p-4 text-sm">
        <div className="font-medium mb-2">Submitted value</div>
        <pre className="overflow-auto text-xs">
          {result
            ? JSON.stringify(
                {
                  quantity: result.quantity,
                  plan: result.plan,
                  scheduledDate: result.scheduledDate,
                  volume: result.volume,
                  themeColor: result.themeColor,
                  avatar: result.avatar?.name ?? null,
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
