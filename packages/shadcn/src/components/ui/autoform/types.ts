import { AutoFormProps as BaseAutoFormProps } from "@autoform/react";
import { FieldValues } from "react-hook-form";

export interface AutoFormProps<T extends FieldValues>
  extends Omit<BaseAutoFormProps<T>, "uiComponents" | "formComponents"> {}
