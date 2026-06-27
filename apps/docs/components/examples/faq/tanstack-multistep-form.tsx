"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ZodProvider } from "@dual-autoform/zod";
import * as z from "zod";

import { AutoForm } from "@/components/ui/autoform/tanstack-form";
import { Button } from "@/components/ui/button";

export interface TanStackMultistepFormStep {
  label: string;
  schema: z.ZodObject<any>;
  defaults: Record<string, unknown>;
}

export interface TanStackMultistepFormProps {
  steps: TanStackMultistepFormStep[];
  onSubmit: (values: Record<number, Record<string, unknown>>) => void;
}

export function TanStackMultistepForm({
  steps,
  onSubmit,
}: TanStackMultistepFormProps) {
  const [step, setStep] = React.useState(0);
  const [values, setValues] = React.useState<
    Record<number, Record<string, unknown>>
  >(() => Object.fromEntries(steps.map((s, i) => [i, { ...s.defaults }])));

  const providers = React.useMemo(
    () => steps.map((s) => new ZodProvider(s.schema)),
    [steps],
  );

  const isLastStep = step === steps.length - 1;
  const currentStep = steps[step];

  const saveAndAdvance = (
    stepIndex: number,
    stepValues: Record<string, unknown>,
  ) => {
    const next = { ...values, [stepIndex]: stepValues };
    setValues(next);

    if (isLastStep) {
      onSubmit(next);
    } else {
      setStep(stepIndex + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <span className={step === i ? "font-medium text-foreground" : ""}>
              {s.label}
            </span>
            {i < steps.length - 1 && <ArrowRight className="h-4 w-4" />}
          </React.Fragment>
        ))}
      </div>

      {currentStep && (
        <AutoForm
          key={currentStep.label}
          schema={providers[step]}
          defaultValues={values[step]}
          onSubmit={(data) => saveAndAdvance(step, data)}
        >
          <div className="flex gap-2">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <Button type="submit" className="gap-2">
              {isLastStep ? "Submit" : "Next"}
              {!isLastStep && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </AutoForm>
      )}
    </div>
  );
}
