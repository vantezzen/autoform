import type { ExtendableAutoFormProps, FieldValues } from "@autoform/react";
import type { FormProps, ConfigProviderProps } from "antd";

export interface AutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {
  antProviderProps?: ConfigProviderProps;
  antFormProps?: FormProps;
}
