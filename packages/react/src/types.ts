import { ReactNode } from "react";
import {
  ParsedField,
  ParsedSchema,
  Renderable,
  SchemaProvider,
  FieldConfig as BaseFieldConfig,
} from "@autoform/core";
import { Control, FieldValues, UseFormReturn } from "react-hook-form";

export interface AutoFormProps<T extends FieldValues> {
  schema: SchemaProvider<T>;
  onSubmit?: (
    values: T,
    form: UseFormReturn<T, any, undefined>
  ) => void | Promise<void>;

  defaultValues?: Partial<T>;
  values?: Partial<T>;

  children?: ReactNode;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
  withSubmit?: boolean;
  onFormInit?: (form: UseFormReturn<T, any, undefined>) => void;
  formProps?: React.ComponentProps<"form"> & Record<string, any>;
}

export type ExtendableAutoFormProps<T extends FieldValues> = Omit<
  AutoFormProps<T>,
  "uiComponents" | "formComponents"
> & {
  uiComponents?: Partial<AutoFormUIComponents>;
  formComponents?: Partial<AutoFormFieldComponents>;
};

export interface AutoFormUIComponents {
  Form: React.ComponentType<React.ComponentProps<"form">>;
  FieldWrapper: React.ComponentType<FieldWrapperProps>;
  ErrorMessage: React.ComponentType<{ error: string }>;
  SubmitButton: React.ComponentType<{ children: ReactNode }>;
  ObjectWrapper: React.ComponentType<ObjectWrapperProps>;
  ArrayWrapper: React.ComponentType<ArrayWrapperProps>;
  ArrayElementWrapper: React.ComponentType<ArrayElementWrapperProps>;
}

export interface AutoFormFieldComponents {
  [key: string]: React.ComponentType<AutoFormFieldProps>;
}

export interface FieldWrapperProps {
  label: Renderable<ReactNode>;
  error?: Renderable<ReactNode>;
  children: ReactNode;
  id: string;
  field: ParsedField;
}

export interface ArrayWrapperProps {
  label: Renderable<ReactNode>;
  children: ReactNode;
  field: ParsedField;
  onAddItem: () => void;
}

export interface ArrayElementWrapperProps {
  children: ReactNode;
  onRemove: () => void;
  index: number;
}

export interface ObjectWrapperProps {
  label: Renderable<ReactNode>;
  children: ReactNode;
  field: ParsedField;
}

export interface AutoFormFieldProps {
  label: Renderable<ReactNode>;
  field: ParsedField;
  value: any;
  error?: string;
  id: string;
  path: string[];
  control: Control<any>;
  inputProps: any;
}

export interface AutoFormContextType {
  schema: ParsedSchema;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
}

export type FieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
> = BaseFieldConfig<
  ReactNode,
  FieldTypes,
  React.ComponentType<FieldWrapperProps>,
  CustomData
>;
