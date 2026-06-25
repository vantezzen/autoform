"use client";

import {
  AutoForm as TanStackAutoForm,
  useFieldTanStack,
} from "@acp-autoform/react/tanstack-form";
import { createAutoForm } from "./AutoForm";

export const AutoForm = createAutoForm(TanStackAutoForm, useFieldTanStack);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
