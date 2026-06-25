"use client";

import React from "react";
import {
  AutoForm as TanStackAutoForm,
  useFieldTanStack,
} from "@acp-autoform/react/tanstack-form";
import type { AutoFormProps } from "@acp-autoform/react";
import { createAutoForm } from "./AutoForm";
import { FieldHookProvider } from "./field-context";

function TanStackAutoFormWrapper<T extends Record<string, any>>(
  props: AutoFormProps<T>,
) {
  return (
    <FieldHookProvider value={useFieldTanStack}>
      <TanStackAutoForm {...props} />
    </FieldHookProvider>
  );
}

export const AutoForm = createAutoForm(TanStackAutoFormWrapper as any);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
