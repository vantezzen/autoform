"use client";

import * as React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { fieldConfig, ZodProvider } from "@acp-autoform/zod";

import { AutoForm } from "@/components/ui/autoform";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { VariantProps } from "class-variance-authority";

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

interface ResetButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  resetVal: Record<string, unknown>;
}

const ResetButton = React.forwardRef<HTMLButtonElement, ResetButtonProps>(
  ({ resetVal, onClick, ...props }, ref) => {
    const { reset } = useFormContext();

    return (
      <Button
        onClick={(event) => {
          reset(resetVal);
          onClick?.(event);
        }}
        ref={ref}
        {...props}
      />
    );
  },
);
ResetButton.displayName = "ResetButton";

export function ExternalDialogSubmitDemo() {
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
              form.reset({ username: "", action: undefined });
            }}
            defaultValues={{ username: "", action: "" }}
          >
            <Button type="submit" className="w-full gap-2">
              <CheckCircle className="h-4 w-4" />
              Save
            </Button>
            <ResetButton
              type="button"
              variant="outline"
              className="w-full gap-2"
              resetVal={{ username: "", action: undefined }}
            >
              <Circle className="h-4 w-4" />
              Reset
            </ResetButton>
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
