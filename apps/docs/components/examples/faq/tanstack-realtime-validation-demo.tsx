"use client";

import * as React from "react";
import * as z from "zod";
import { ZodProvider } from "@dual-autoform/zod";
import { useFormContext } from "@dual-autoform/react/tanstack-form";

import { AutoForm } from "@/components/ui/autoform/tanstack-form";
import { Button } from "@/components/ui/button";

const realtimeSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
});

type RealtimeValues = z.infer<typeof realtimeSchema>;

const schemaProvider = new ZodProvider(realtimeSchema);

function SubmitButton() {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.canSubmit}>
      {(canSubmit) => (
        <Button type="submit" className="mt-4" disabled={!canSubmit}>
          Create Account
        </Button>
      )}
    </form.Subscribe>
  );
}

export function TanStackRealtimeValidationDemo() {
  const [values, setValues] = React.useState<RealtimeValues | null>(null);

  return (
    <div className="grid gap-4 rounded-lg border bg-background p-6">
      <AutoForm
        schema={schemaProvider}
        onSubmit={(values) => setValues(values)}
      >
        <SubmitButton />
        {values && (
          <div className="rounded-md border bg-muted p-4">
            <pre className="text-sm">
              <code className="border-none bg-transparent">
                {JSON.stringify(values, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </AutoForm>
    </div>
  );
}
