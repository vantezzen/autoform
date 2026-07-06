"use client";

import {
  AutoForm as ReactHookFormAutoForm,
  useFieldRHF,
} from "@autoform/react/react-hook-form";
import { createAutoForm } from "./AutoForm";

export const AutoForm = createAutoForm(ReactHookFormAutoForm, useFieldRHF);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
