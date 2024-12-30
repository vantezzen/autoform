import { ExtendableAutoFormProps } from "@autoform/react";
import type { FormProps } from "antd";
import { ConfigProviderProps } from "antd";
import { FieldValues } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form";

export interface AntAutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {
  AntProviderProps?: ConfigProviderProps;
  AntFormProps?: FormProps;
}

export interface AntFormProviderProps {
  formProps: FormProps | undefined;
  children: React.ReactNode;
}

export interface AntObjectProviderProps {
  control: ControllerRenderProps<any> | undefined;
  children: React.ReactNode;
  label: string;
  getValues: (value?: string) => any;
}
