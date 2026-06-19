"use client";

import * as React from "react";
import { CheckCircle, Circle } from "lucide-react";
import * as z from "zod";
import { fieldConfig, ZodProvider } from "@acp-autoform/zod";
import { useFormContext } from "@acp-autoform/react/tanstack-form";

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

const dialogSchema = z.object({
  username: z.string().min(2, "Enter at least 2 characters"),
  action: z.enum(["create", "read", "update", "delete"]).superRefine(
    fieldConfig({
      label: "Action",
      inputProps: {
        placeholder: "Select an action",
      },
    }),
  ),
});

const schemaProvider = new ZodProvider(dialogSchema);

function ResetButton() {
  const form = useFormContext();

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full gap-2"
      onClick={() => form.reset()}
    >
      <Circle className="h-4 w-4" />
      Reset
    </Button>
  );
}

export default function TanStackDialogSubmitDemo() {
  const [submitted, setSubmitted] = React.useState<z.infer<
    typeof dialogSchema
  > | null>(null);

  return (
    <div className="flex min-h-72 items-center justify-center rounded-lg border bg-background p-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog form</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit permission</DialogTitle>
            <DialogDescription>
              The submit and reset buttons are rendered as AutoForm children.
            </DialogDescription>
          </DialogHeader>
          <AutoForm
            schema={schemaProvider}
            onSubmit={(data, form) => {
              setSubmitted(data);
              form.reset();
            }}
            defaultValues={{ username: "", action: undefined }}
          >
            <Button type="submit" className="w-full gap-2">
              <CheckCircle className="h-4 w-4" />
              Save
            </Button>
            <ResetButton />
          </AutoForm>
          {submitted && (
            <pre className="overflow-auto rounded-md bg-secondary p-3 text-xs">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
