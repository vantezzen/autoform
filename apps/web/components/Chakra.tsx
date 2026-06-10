"use client";
import { createAutoForm } from "@acp-autoform/chakra";
import { AutoForm as AutoFormRHF } from "@acp-autoform/react/react-hook-form";
import { AutoForm as AutoFormTanstack } from "@acp-autoform/react/tanstack-form";
import { zodSchemaProvider } from "./utils";

const ChakraRHFAutoForm = createAutoForm(AutoFormRHF);
const ChakraTanstackAutoForm = createAutoForm(AutoFormTanstack);

export function ChakraRHF() {
  return (
    <ChakraRHFAutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      colorModeProps={{
        enableSystem: false,
      }}
      withSubmit
    />
  );
}

export function ChakraTanstack() {
  return (
    <ChakraTanstackAutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      colorModeProps={{
        enableSystem: false,
      }}
      withSubmit
    />
  );
}
