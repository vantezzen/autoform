"use client";
import { AutoForm as ShadcnRHFAutoForm } from "@autoform/shadcn/components/ui/autoform/react-hook-form";
import { AutoForm as ShadcnTanstackAutoForm } from "@autoform/shadcn/components/ui/autoform/tanstack-form";
import { AutoFormFieldProps } from "@autoform/react/react-hook-form";
import { zodSchemaProvider } from "./utils";
import "@autoform/shadcn/globals.css";

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
