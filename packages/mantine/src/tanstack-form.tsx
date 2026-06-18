import { AutoForm as TanStackAutoForm } from "@acp-autoform/react/tanstack-form";
import type { ComponentType } from "react";
import type { ExtendableAutoFormProps } from "@acp-autoform/react";
import { createAutoForm } from "./AutoForm";

export const AutoForm: ComponentType<
  ExtendableAutoFormProps<any> & Record<string, any>
> = createAutoForm(TanStackAutoForm);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
