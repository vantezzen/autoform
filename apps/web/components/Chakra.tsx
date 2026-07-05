"use client";
import { AutoForm as ChakraRHFAutoForm } from "@autoform/chakra/react-hook-form";
import { AutoForm as ChakraTanstackAutoForm } from "@autoform/chakra/tanstack-form";
import { zodSchemaProvider } from "./utils";

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
