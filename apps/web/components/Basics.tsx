"use client";
import { createAutoForm } from "@acp-autoform/shadcn/components/ui/autoform/AutoForm";
import { AutoForm as AutoFormRHF } from "@acp-autoform/react/react-hook-form";
import { AutoForm as AutoFormTanstack } from "@acp-autoform/react/tanstack-form";
import { AutoFormFieldProps } from "@acp-autoform/react";
import { zodSchemaProvider } from "./utils";
import "@acp-autoform/shadcn/globals.css";

const ShadcnRHFAutoForm = createAutoForm(AutoFormRHF);
const ShadcnTanstackAutoForm = createAutoForm(AutoFormTanstack);

function customComponent({ label, inputProps }: AutoFormFieldProps) {
  return (
    <div>
      <input
        type="text"
        className="bg-red-400 rounded-lg p-4"
        {...inputProps}
      />
    </div>
  );
}

export function BasicsRHF() {
  return (
    <ShadcnRHFAutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
      formComponents={{
        custom: customComponent,
      }}
    />
  );
}

export function BasicsTanstack() {
  return (
    <ShadcnTanstackAutoForm
      schema={zodSchemaProvider}
      onFormInit={(f) => {
        (window as any).form = f;
      }}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
      formComponents={{
        custom: customComponent,
      }}
    />
  );
}
