"use client";

import * as React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { formOptions } from "@tanstack/react-form";
import * as z from "zod";
import { fieldConfig, ZodProvider } from "@dual-autoform/zod";
import { useAppForm } from "@dual-autoform/react/tanstack-form";

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

type DialogValues = z.infer<typeof dialogSchema>;

const schemaProvider = new ZodProvider(dialogSchema);
const defaultValues: DialogValues = { username: "", action: "create" };

export function TanStackDialogFormControlDemo() {
  const [submitted, setSubmitted] = React.useState<DialogValues | null>(null);
  const form = useAppForm(formOptions({ defaultValues }));

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
              The dialog actions call methods on an external form control.
            </DialogDescription>
          </DialogHeader>
          <AutoForm
            schema={schemaProvider}
            formControl={form}
            formProps={{ id: "tanstack-external-dialog-form-control" }}
            onSubmit={(data, formApi) => {
              setSubmitted(data);
              formApi.reset();
            }}
          />
          <div className="grid gap-4">
            <Button
              type="button"
              className="w-full gap-2"
              onClick={() => void form.handleSubmit()}
            >
              <CheckCircle className="h-4 w-4" />
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onClick={() => form.reset()}
            >
              <Circle className="h-4 w-4" />
              Reset
            </Button>
          </div>
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
