"use client";
import { createAutoForm } from "@acp-autoform/ant";
import { AutoForm as AutoFormRHF } from "@acp-autoform/react/react-hook-form";
import { AutoForm as AutoFormTanstack } from "@acp-autoform/react/tanstack-form";
import { zodSchemaProvider } from "./utils";

const AntRHFAutoForm = createAutoForm(AutoFormRHF);
const AntTanstackAutoForm = createAutoForm(AutoFormTanstack);

export function AntRHF() {
  return (
    <AntRHFAutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      antFormProps={{
        layout: "horizontal",
        className: "no-margin-form",
        onValuesChange: (e) => {
          console.log("inputChange", e);
        },
      }}
      withSubmit
    />
  );
}

export function AntTanstack() {
  return (
    <AntTanstackAutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      antFormProps={{
        layout: "horizontal",
        className: "no-margin-form",
        onValuesChange: (e) => {
          console.log("inputChange", e);
        },
      }}
      withSubmit
    />
  );
}
