import type { ExtendableAutoFormProps } from "@autoform/react";
import type { FormProps, ConfigProviderProps } from "antd";

export interface AutoFormProps<
  T extends Record<string, any> = Record<string, any>
> extends ExtendableAutoFormProps<T> {
  antProviderProps?: ConfigProviderProps;
  antFormProps?: FormProps;
}
