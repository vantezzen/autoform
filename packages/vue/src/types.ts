import type { Component, VNode } from "vue";
import type {
  ParsedField,
  ParsedSchema,
  Renderable,
  SchemaProvider,
  FieldConfig as BaseFieldConfig,
} from "@autoform/core";

export interface AutoFormProps<T extends Record<string, any> = Record<string, any>> {
  schema: SchemaProvider<T>;
  defaultValues?: Partial<T>;
  values?: Partial<T>;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
  withSubmit?: boolean;
  formProps?: Record<string, any>;
}

export type ExtendableAutoFormProps<T extends Record<string, any> = Record<string, any>> = Omit<
  AutoFormProps<T>,
  "uiComponents" | "formComponents"
> & {
  uiComponents?: Partial<AutoFormUIComponents>;
  formComponents?: Partial<AutoFormFieldComponents>;
};

export interface AutoFormUIComponents {
  Form: Component;
  FieldWrapper: Component;
  ErrorMessage: Component;
  SubmitButton: Component;
  ObjectWrapper: Component;
  ArrayWrapper: Component;
  ArrayElementWrapper: Component;
}

export interface AutoFormFieldComponents {
  [key: string]: Component;
}

export interface FieldWrapperProps {
  label: Renderable<VNode>;
  description?: string;
  error?: Renderable<VNode>;
  id: string;
  field: ParsedField;
}

export interface ArrayWrapperProps {
  label: Renderable<VNode>;
  field: ParsedField;
}

export interface ArrayElementWrapperProps {
  index: number;
}

export interface ObjectWrapperProps {
  label: Renderable<VNode>;
  field: ParsedField;
}

export interface AutoFormFieldProps {
  label: Renderable<VNode>;
  field: ParsedField;
  value: any;
  error?: string;
  id: string;
  path: string[];
  inputProps: any;
}

export interface AutoFormContextType {
  schema: ParsedSchema;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
  values: Record<string, any>;
  errors: Record<string, string>;
  setFieldValue: (path: string, value: any) => void;
  getFieldValue: (path: string) => any;
  getFieldError: (path: string) => string | undefined;
}

export type FieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
> = BaseFieldConfig<
  VNode,
  FieldTypes,
  Component,
  CustomData
>;
