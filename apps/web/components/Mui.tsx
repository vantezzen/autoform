"use client";
import { createAutoForm } from "@acp-autoform/mui";
import { AutoForm as AutoFormRHF } from "@acp-autoform/react/react-hook-form";
import { AutoForm as AutoFormTanstack } from "@acp-autoform/react/tanstack-form";
import { zodSchemaProvider } from "./utils";

const MuiRHFAutoForm = createAutoForm(AutoFormRHF);
const MuiTanstackAutoForm = createAutoForm(AutoFormTanstack);

export function MuiRHF() {
  return (
    <MuiRHFAutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
    />
  );
}

export function MuiTanstack() {
  return (
    <MuiTanstackAutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
    />
  );
}
