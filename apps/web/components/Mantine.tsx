"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import { createAutoForm } from "@acp-autoform/mantine";
import { AutoForm as AutoFormRHF } from "@acp-autoform/react/react-hook-form";
import { AutoForm as AutoFormTanstack } from "@acp-autoform/react/tanstack-form";
import { zodSchemaProvider } from "./utils";
import "@mantine/core/styles.css";

const MantineRHFAutoForm = createAutoForm(AutoFormRHF);
const MantineTanstackAutoForm = createAutoForm(AutoFormTanstack);

export function MantineRHF() {
  const theme = createTheme({});
  return (
    <MantineProvider theme={theme}>
      <MantineRHFAutoForm
        schema={zodSchemaProvider}
        onSubmit={(data) => {
          console.log(JSON.stringify(data, null, 2));
        }}
        withSubmit
      />
    </MantineProvider>
  );
}

export function MantineTanstack() {
  const theme = createTheme({});
  return (
    <MantineProvider theme={theme}>
      <MantineTanstackAutoForm
        schema={zodSchemaProvider}
        onSubmit={(data) => {
          console.log(JSON.stringify(data, null, 2));
        }}
        withSubmit
      />
    </MantineProvider>
  );
}
