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
  isBack,
  isNext,
  onBack,
  onNext,
}: {
  isBack: boolean;
  isNext: boolean;
  onBack: () => void;
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
      {isBack && (
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          onClick={() => onBack()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      )}
      <Button type="submit" className="gap-2" onClick={handleNext}>
        {isNext ? "Next" : "Submit"}
        {isNext && <ArrowRight className="h-4 w-4" />}
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
  const currentStep = steps[step];

  const saveAndAdvance = (stepIndex: number, stepValues: FieldValues) => {
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
      {currentStep && (
        <PreviewAutoForm
          key={currentStep.label}
          schema={providers[step]}
          defaultValues={values[step]}
        >
          <StepActions
            isBack={step > 0}
            isNext={!isLastStep}
            onBack={() => step > 0 && setStep(step - 1)}
            onNext={(v: FieldValues) => saveAndAdvance(step, v)}
          />
        </PreviewAutoForm>
      )}
    </div>
  );
}
