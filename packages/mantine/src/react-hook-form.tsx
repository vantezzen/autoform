import { AutoForm as ReactHookFormAutoForm } from "@acp-autoform/react/react-hook-form";
import type { ComponentType } from "react";
import type { ExtendableAutoFormProps } from "@acp-autoform/react";
import { createAutoForm } from "./AutoForm";

export const AutoForm: ComponentType<
  ExtendableAutoFormProps<any> & Record<string, any>
> = createAutoForm(ReactHookFormAutoForm);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
