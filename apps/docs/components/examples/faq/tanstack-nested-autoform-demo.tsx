"use client";

import * as React from "react";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useFieldContext } from "@dual-autoform/react/tanstack-form";
import { fieldConfig, ZodProvider } from "@dual-autoform/zod";
import * as z from "zod";

import { AutoForm } from "@/components/ui/autoform/tanstack-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const colorsSchema = z.object({
  colors: z.array(z.string().min(1, "Enter a color")).min(1),
});

const profileSchema = z.object({
  username: z.string().min(2, "Enter a username"),
  colors: z
    .array(z.string())
    .min(1, "Choose at least one color")
    .default([])
    .describe("Favorite colors")
    .check(fieldConfig({ fieldType: "colorDialog" })),
});

const colorsProvider = new ZodProvider(colorsSchema);
const profileProvider = new ZodProvider(profileSchema);

function ColorDialogField() {
  const [open, setOpen] = React.useState(false);
  const field = useFieldContext<string[]>();
  const colors = Array.isArray(field.state.value) ? field.state.value : [];

  return (
    <div className="space-y-3">
      {colors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {colors.map((color, index) => (
            <span
              className="rounded-md border bg-secondary px-2 py-1 text-xs"
              key={`${color}-${index}`}
            >
              {color}
            </span>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" size="sm">
            Add colors
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pick favorite colors</DialogTitle>
            <DialogDescription>
              This nested AutoForm writes its value back to the parent field.
            </DialogDescription>
          </DialogHeader>
          <AutoForm
            schema={colorsProvider}
            values={{ colors }}
            onSubmit={(data) => {
              field.handleChange(data.colors);
              setOpen(false);
            }}
          >
            <Button type="submit">Save Colors</Button>
          </AutoForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function TanStackNestedAutoFormDemo() {
  const [result, setResult] = React.useState<z.infer<
    typeof profileSchema
  > | null>(null);

  return (
    <div className="grid gap-4 rounded-lg border bg-background p-6 md:grid-cols-[1fr_220px]">
      <AutoForm
        schema={profileProvider}
        formComponents={{
          colorDialog: ColorDialogField as React.FC<AutoFormFieldProps>,
        }}
        onSubmit={(data) => setResult(data)}
        withSubmit
      />
      <div className="rounded-md border bg-secondary/50 p-4 text-sm">
        <div className="font-medium">Submitted value</div>
        <pre className="mt-3 overflow-auto text-xs">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
