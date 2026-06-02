"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FieldValues, useFormContext } from "react-hook-form";
import { ZodProvider } from "@autoform/zod";
import * as z from "zod";

import { PreviewAutoForm } from "@/components/examples/faq/autoform-preview";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MultistepFormStep {
  label: string;
  schema: z.ZodObject<any>;
  defaults: FieldValues;
}

export interface MultistepFormProps {
  steps: MultistepFormStep[];
  onSubmit: (values: FieldValues) => void;
}

// ---------------------------------------------------------------------------
// StepActions — validates the current form then fires onNext / onBack
// ---------------------------------------------------------------------------

function StepActions<T extends FieldValues>({
  backTo,
  nextLabel = "Next",
  onBack,
  onNext,
}: {
  backTo?: number;
  nextLabel?: string;
  onBack?: (step: number) => void;
  onNext: (values: T) => void;
}) {
  const { trigger, getValues } = useFormContext<T>();

  const handleNext = async () => {
    const isValid = await trigger(undefined, { shouldFocus: true });

    if (isValid) {
      onNext(getValues());
    }
  };

  return (
    <div className="flex gap-2">
      {backTo !== undefined && (
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          onClick={() => onBack?.(backTo)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      )}
      <Button type="button" className="gap-2" onClick={handleNext}>
        {nextLabel}
        {nextLabel === "Next" && <ArrowRight className="h-4 w-4" />}
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MultistepForm
// ---------------------------------------------------------------------------

export function MultistepForm({ steps, onSubmit }: MultistepFormProps) {
  const [step, setStep] = React.useState(0);
  const [values, setValues] = React.useState<Record<number, FieldValues>>(() =>
    Object.fromEntries(steps.map((s, i) => [i, { ...s.defaults }])),
  );

  const providers = React.useMemo(
    () => steps.map((s) => new ZodProvider(s.schema)),
    [steps],
  );

  const isLastStep = step === steps.length - 1;

  const saveAndAdvance = (stepIndex: number, stepValues: FieldValues) => {
    const next = { ...values, [stepIndex]: stepValues };
    setValues(next);

    if (isLastStep) {
      onSubmit(Object.values(next).reduce((acc, v) => ({ ...acc, ...v }), {}));
    } else {
      setStep(stepIndex + 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
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

      {/* Active step form */}
      {steps.map((s, i) =>
        step === i ? (
          <PreviewAutoForm
            key={s.label}
            schema={providers[i]}
            defaultValues={values[i]}
          >
            <StepActions
              backTo={i > 0 ? i - 1 : undefined}
              nextLabel={isLastStep ? "Submit" : "Next"}
              onBack={setStep}
              onNext={(v: FieldValues) => saveAndAdvance(i, v)}
            />
          </PreviewAutoForm>
        ) : null,
      )}
    </div>
  );
}
