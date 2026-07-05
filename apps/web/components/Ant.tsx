"use client";
import { AutoForm as AntRHFAutoForm } from "@autoform/ant/react-hook-form";
import { AutoForm as AntTanstackAutoForm } from "@autoform/ant/tanstack-form";
import { zodSchemaProvider } from "./utils";

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
        onValuesChange: (e: any) => {
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
        onValuesChange: (e: any) => {
          console.log("inputChange", e);
        },
      }}
      withSubmit
    />
  );
}
