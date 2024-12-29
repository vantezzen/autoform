import { ExtendableAutoFormProps } from "@autoform/react";
import type { FormProps } from "antd";
import { ConfigProviderProps } from "antd";
import { FieldValues } from "react-hook-form";

export interface AntAutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {
  AntProviderProps?: ConfigProviderProps;
  AntFormProps?: FormProps;
}
