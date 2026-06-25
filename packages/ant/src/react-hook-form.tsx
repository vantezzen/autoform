"use client";

import React from "react";
import {
  AutoForm as ReactHookFormAutoForm,
  useFieldRHF,
} from "@acp-autoform/react/react-hook-form";
import type { AutoFormProps } from "@acp-autoform/react";
import { createAutoForm } from "./AutoForm";
import { FieldHookProvider } from "./field-context";

function RHFAutoForm<T extends Record<string, any>>(props: AutoFormProps<T>) {
  return (
    <FieldHookProvider value={useFieldRHF}>
      <ReactHookFormAutoForm {...props} />
    </FieldHookProvider>
  );
}

export const AutoForm = createAutoForm(RHFAutoForm as any);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
