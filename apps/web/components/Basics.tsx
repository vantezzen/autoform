"use client";
import { AutoForm as ShadcnRHFAutoForm } from "@dual-autoform/shadcn/components/ui/autoform/react-hook-form";
import { AutoForm as ShadcnTanstackAutoForm } from "@dual-autoform/shadcn/components/ui/autoform/tanstack-form";
import { AutoFormFieldProps } from "@dual-autoform/react";
import { zodSchemaProvider } from "./utils";
import "@dual-autoform/shadcn/globals.css";

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
