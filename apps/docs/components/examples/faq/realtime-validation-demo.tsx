"use client";

import * as React from "react";
import { createFormControl, useFormContext } from "react-hook-form";
import * as z from "zod";
import { ZodProvider } from "@autoform/zod";

import { AutoForm } from "@/components/ui/autoform/react-hook-form";
import { Button } from "@/components/ui/button";

const realtimeSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
});

type RealtimeValues = z.infer<typeof realtimeSchema>;

const schemaProvider = new ZodProvider(realtimeSchema);

const SubmitButton = () => {
  const {
    formState: { isValid },
  } = useFormContext();

  return (
    <Button type="submit" className="mt-4" disabled={!isValid}>
      Create Account
    </Button>
  );
};

export function RealtimeValidationDemo() {
  const { formControl } = React.useMemo(
    () =>
      createFormControl<RealtimeValues>({
        mode: "all",
      }),
    [],
  );
  const [values, setValues] = React.useState<RealtimeValues | null>(null);

  return (
    <div className="rounded-lg border bg-background p-6">
      <AutoForm
        schema={schemaProvider}
        formControl={formControl}
        onSubmit={(values) => setValues(values)}
      >
        <SubmitButton />
        {values && (
          <pre className="max-w-full overflow-x-auto rounded-md bg-secondary p-3 text-xs">
            {JSON.stringify(values, null, 2)}
          </pre>
        )}
      </AutoForm>
    </div>
  );
}
