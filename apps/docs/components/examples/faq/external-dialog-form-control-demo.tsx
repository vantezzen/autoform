"use client";

import * as React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { createFormControl } from "react-hook-form";
import * as z from "zod";
import { fieldConfig, ZodProvider } from "@acp-autoform/zod";

import { AutoForm } from "@/components/ui/autoform";
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

export function ExternalDialogFormControlDemo() {
  const [submitted, setSubmitted] = React.useState<z.infer<
    typeof dialogSchema
  > | null>(null);

  const { formControl, reset } = React.useMemo(
    () => createFormControl<DialogValues>(),
    [],
  );

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
              The dialog actions submit via an external form control.
            </DialogDescription>
          </DialogHeader>
          <AutoForm
            schema={schemaProvider}
            formControl={formControl}
            formProps={{ id: "external-dialog-form-control" }}
            onSubmit={(data, form) => {
              setSubmitted(data);
              form.reset({ username: "", action: undefined });
            }}
            defaultValues={{ username: "", action: "" }}
          />
          <div className="grid gap-4">
            <Button
              type="submit"
              form="external-dialog-form-control" // using the id passed to the form
              className="w-full gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              onClick={() => reset({ username: "", action: undefined })}
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
