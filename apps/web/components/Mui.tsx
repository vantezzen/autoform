"use client";
import { AutoForm as MuiRHFAutoForm } from "@acp-autoform/mui/react-hook-form";
import { AutoForm as MuiTanstackAutoForm } from "@acp-autoform/mui/tanstack-form";
import { zodSchemaProvider } from "./utils";

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
