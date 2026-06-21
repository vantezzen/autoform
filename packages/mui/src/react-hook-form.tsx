"use client";

import { AutoForm as ReactHookFormAutoForm } from "@acp-autoform/react/react-hook-form";
import { createAutoForm } from "./AutoForm";

export const AutoForm = createAutoForm(ReactHookFormAutoForm);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
