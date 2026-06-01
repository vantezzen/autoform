"use client";

import * as React from "react";
import { createFormControl, useFormContext } from "react-hook-form";
import * as z from "zod";
import { ZodProvider } from "@autoform/zod";

import { PreviewAutoForm } from "@/components/examples/faq/autoform-preview";
import { Button } from "@/components/ui/button";

const realtimeSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
});

type RealtimeValues = z.infer<typeof realtimeSchema>;

const schemaProvider = new ZodProvider(realtimeSchema);

const SubmitButton = () => {
  const { subscribe } = useFormContext();
  const [isValid, setIsValid] = React.useState(false);
  subscribe({
    formState: { isValid: true },
    callback: ({ isValid: isFormValid }) => {
      if (isValid !== isFormValid && typeof isFormValid === "boolean")
        setIsValid(isFormValid);
    },
  });
  return (
    <Button type="submit" className="mt-4" disabled={!isValid}>
      Create Account
    </Button>
  );
};

const Values = () => {
  const { subscribe } = useFormContext<RealtimeValues>();
  const [values, setValues] = React.useState<RealtimeValues | null>(null);
  subscribe({
    formState: { values: true },
    callback: ({ values: data }) => {
      setValues(data);
    },
  });

  return (
    <div className="rounded-md border bg-muted p-4">
      <pre className="text-sm">
        <code className="bg-transparent border-none">
          {JSON.stringify(values, null, 2)}
        </code>
      </pre>
    </div>
  );
};
export function RealtimeValidationDemo() {
  const { formControl, trigger } = createFormControl<RealtimeValues>({
    mode: "all",
  });

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !(e.target as HTMLElement).hasAttribute("type")) {
      trigger(undefined, { shouldFocus: true });
    }
  };

  return (
    <div className="grid gap-4 rounded-lg border bg-background p-6 ">
      <PreviewAutoForm
        schema={schemaProvider}
        formControl={formControl}
        onSubmit={(values) => console.log(values)}
        formProps={{
          onKeyDown: handleFormKeyDown,
        }}
      >
        <SubmitButton />
        <Values />
      </PreviewAutoForm>
    </div>
  );
}
