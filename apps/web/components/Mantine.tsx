"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import { AutoForm as MantineRHFAutoForm } from "@acp-autoform/mantine/react-hook-form";
import { AutoForm as MantineTanstackAutoForm } from "@acp-autoform/mantine/tanstack-form";
import { zodSchemaProvider } from "./utils";
import "@mantine/core/styles.css";

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
