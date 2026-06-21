"use client";

import { AutoForm as TanStackAutoForm } from "@acp-autoform/react/tanstack-form";
import { createAutoForm } from "./AutoForm";

export const AutoForm = createAutoForm(TanStackAutoForm);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
