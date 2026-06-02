"use client";

import React, { memo, useCallback, useRef, useState } from "react";
import { AutoForm as BaseAutoForm } from "@acp-autoform/react";
import type { AutoFormUIComponents } from "@acp-autoform/react";
import { AutoForm as MuiAutoForm, MuiAutoFormFieldComponents } from "@acp-autoform/mui";
import { ZodProvider } from "@acp-autoform/zod";
import { ThemeProvider } from "@mui/material/styles";
import { z } from "zod";
import { ArrayElementWrapper } from "../../../../../packages/mui/src/components/ArrayElementWrapper";
import { ArrayWrapper } from "../../../../../packages/mui/src/components/ArrayWrapper";
import { ErrorMessage } from "../../../../../packages/mui/src/components/ErrorMessage";
import { FieldWrapper } from "../../../../../packages/mui/src/components/FieldWrapper";
import { Form } from "../../../../../packages/mui/src/components/Form";
import { ObjectWrapper } from "../../../../../packages/mui/src/components/ObjectWrapper";
import { SubmitButton } from "../../../../../packages/mui/src/components/SubmitButton";

type FormValues = {
  data: string;
};

type Counters = {
  mounts: number;
  unmounts: number;
  formInits: number;
};

type TestPanelProps = {
  title: string;
  description: string;
  mode: "current" | "stable";
};

type FormHostProps = {
  mode: "current" | "stable";
  title: string;
  defaultValues: FormValues;
  countersRef: React.MutableRefObject<Counters>;
  renderTick: number;
};

const muiUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

const schemaProvider = new ZodProvider(
  z.object({
    data: z.string().min(1).default("server value"),
  }),
);

function StableMuiAutoForm({
  theme,
  uiComponents,
  formComponents,
  ...props
}: React.ComponentProps<typeof MuiAutoForm<FormValues>>) {
  const form = (
    <BaseAutoForm
      {...props}
      uiComponents={{ ...muiUIComponents, ...uiComponents }}
      formComponents={{ ...MuiAutoFormFieldComponents, ...formComponents }}
    />
  );

  return theme ? <ThemeProvider theme={theme}>{form}</ThemeProvider> : form;
}

function MountProbe({
  onMountChange,
}: {
  onMountChange: (type: "mount" | "unmount") => void;
}) {
  React.useEffect(() => {
    onMountChange("mount");

    return () => onMountChange("unmount");
  }, [onMountChange]);

  return null;
}

const FormHost = memo(function FormHost({
  mode,
  title,
  defaultValues,
  countersRef,
  renderTick: _renderTick,
}: FormHostProps) {
  const AutoForm = mode === "current" ? MuiAutoForm<FormValues> : StableMuiAutoForm;

  const handleMountChange = useCallback(
    (type: "mount" | "unmount") => {
      if (type === "mount") {
        countersRef.current.mounts += 1;
      } else {
        countersRef.current.unmounts += 1;
      }
    },
    [countersRef],
  );

  const handleFormInit = useCallback(() => {
    countersRef.current.formInits += 1;
  }, [countersRef]);

  return (
    <AutoForm
      schema={schemaProvider}
      defaultValues={defaultValues}
      onFormInit={handleFormInit}
      formProps={{ "aria-label": title }}
    >
      <MountProbe onMountChange={handleMountChange} />
    </AutoForm>
  );
});

function TestPanel({ title, description, mode }: TestPanelProps) {
  const defaultData = useRef<FormValues>({ data: "server value" });
  const [tick, setTick] = useState(0);
  const countersRef = useRef<Counters>({
    mounts: 0,
    unmounts: 0,
    formInits: 0,
  });
  const [visibleCounters, setVisibleCounters] = useState<Counters>(
    countersRef.current,
  );
  const [lastCheck, setLastCheck] = useState("No check yet");

  const rerenderAndCheck = () => {
    const activeForm = document.activeElement?.closest("form");
    const before = `${activeForm?.getAttribute("aria-label") ?? "none"}:${
      (document.activeElement as HTMLInputElement | null)?.name || "none"
    }`;

    setTick((current) => current + 1);

    window.setTimeout(() => {
      const form = document.querySelector(
        `form[aria-label="${title}"]`,
      ) as HTMLFormElement | null;
      const input = form?.querySelector(
        'input[name="data"]',
      ) as HTMLInputElement | null;
      const nextActiveForm = document.activeElement?.closest("form");
      const after = `${nextActiveForm?.getAttribute("aria-label") ?? "none"}:${
        (document.activeElement as HTMLInputElement | null)?.name || "none"
      }`;

      setLastCheck(
        `before focus: ${before}; after focus: ${after}; input value: ${
          input?.value ?? "missing"
        }`,
      );
      setVisibleCounters({ ...countersRef.current });
    }, 0);
  };

  return (
    <section className="rounded-lg border border-fd-border bg-fd-card p-5">
      <div className="mb-4 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-fd-muted-foreground">{description}</p>
      </div>

      <div className="mb-4 grid gap-3 text-sm sm:grid-cols-4">
        <div className="rounded-md border border-fd-border p-3">
          <div className="text-fd-muted-foreground">Parent renders</div>
          <div className="text-2xl font-semibold">{tick + 1}</div>
        </div>
        <div className="rounded-md border border-fd-border p-3">
          <div className="text-fd-muted-foreground">Probe mounts</div>
          <div className="text-2xl font-semibold">{visibleCounters.mounts}</div>
        </div>
        <div className="rounded-md border border-fd-border p-3">
          <div className="text-fd-muted-foreground">Probe unmounts</div>
          <div className="text-2xl font-semibold">
            {visibleCounters.unmounts}
          </div>
        </div>
        <div className="rounded-md border border-fd-border p-3">
          <div className="text-fd-muted-foreground">onFormInit calls</div>
          <div className="text-2xl font-semibold">
            {visibleCounters.formInits}
          </div>
        </div>
      </div>

      <FormHost
        mode={mode}
        title={title}
        defaultValues={defaultData.current}
        countersRef={countersRef}
        renderTick={tick}
      />

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          className="rounded-md border border-fd-border px-3 py-2 text-sm font-medium hover:bg-fd-secondary"
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={rerenderAndCheck}
        >
          Simulate parent rerender
        </button>
        <span className="text-sm text-fd-muted-foreground">{lastCheck}</span>
      </div>
    </section>
  );
}

export default function AutoFormRerenderReproPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="mb-2 text-sm font-medium text-fd-muted-foreground">
          AutoForm rerender reproduction
        </p>
        <h1 className="text-3xl font-semibold tracking-normal">
          Remount and defaultValues checks
        </h1>
        <p className="mt-3 max-w-3xl text-fd-muted-foreground">
          Type in the generated field, keep it focused, then press the rerender
          button. The button prevents mouse focus so a focus change or value reset
          comes from the form subtree changing, not from the button itself.
        </p>
      </div>

      <TestPanel
        mode="current"
        title="Current @acp-autoform/mui wrapper"
        description="Uses the published wrapper shape with an inner component declared during render."
      />

      <TestPanel
        mode="stable"
        title="Stable local composition"
        description="Composes BaseAutoForm directly so React sees the same component type across parent rerenders."
      />
    </main>
  );
}
