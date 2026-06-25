import { ReactNode } from "react";
import {
  ParsedField,
  ParsedSchema,
  Renderable,
  FieldConfig as BaseFieldConfig,
  SchemaProvider,
} from "@acp-autoform/core";

// Internal field binding contract used by UI packages to inject adapter hooks.

export interface FieldBinding {
  value: any;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  name: string;
  /** ref is optional - not all adapters provide one */
  ref?: React.Ref<any>;
}

export interface UseFieldReturn {
  field: FieldBinding;
}

export type UseFieldFn = (opts: { name: string }) => UseFieldReturn;

// AutoForm props

export interface AutoFormProps<T extends Record<string, any> = Record<string, any>> {
  /** Schema adapter that manages fields, default values, and validation. */
  schema: SchemaProvider<T>;
  /**
   * External form control handle. For react-hook-form: the return of createFormControl().
   * For TanStack: the form instance returned by the adapter's useAppForm() in a parent.
   */
  formControl?: any;
  /**
   * Runs after successful validation. Receives the values and submit event.
   * @default () => {}
   */
  onSubmit?: (
    values: T,
    form: any,
    e?: React.BaseSyntheticEvent,
  ) => void | Promise<void>;
  /**
   * Initial values merged over schema defaults.
   * @default inferred from schema
   */
  defaultValues?: Partial<T>;
  /** Controlled values that keep the form in sync with external state. */
  values?: Partial<T>;
  /** Extra UI rendered after the generated fields. */
  children?: ReactNode;
  /** Layout/wrapper components for fields, errors, and structure. */
  uiComponents: AutoFormUIComponents;
  /** Form components mapped to field types (string, number, select, etc.). */
  formComponents: AutoFormFieldComponents;
  /**
   * Show a default submit button after all fields.
   * @default false
   */
  withSubmit?: boolean;
  /**
   * Legacy hook to access the form instance after init.
   * @deprecated Prefer passing an external form control via `formControl`.
   */
  onFormInit?: (form: any) => void;
  /**
   * Props forwarded to the underlying <form> element.
   * @default {}
   */
  formProps?: React.ComponentProps<"form"> | Record<string, any>;
}

export type AutoFormComponent = <
  T extends Record<string, any> = Record<string, any>,
>(props: AutoFormProps<T>) => React.ReactElement;

export type ExtendableAutoFormProps<T extends Record<string, any>> = Omit<
  AutoFormProps<T>,
  "uiComponents" | "formComponents"
> & {
  uiComponents?: Partial<AutoFormUIComponents>;
  formComponents?: Partial<AutoFormFieldComponents>;
};

// UI component contracts

export interface AutoFormUIComponents {
  /** Root form element. */
  Form: React.ComponentType<React.ComponentProps<"form">>;
  /** Wraps each field with label, error, and layout UI. */
  FieldWrapper: React.ComponentType<FieldWrapperProps>;
  /** Renders AutoForm configuration errors. */
  ErrorMessage: React.ComponentType<{ error: string }>;
  /** Submit button rendered when withSubmit is enabled. */
  SubmitButton: React.ComponentType<{ children: ReactNode }>;
  /** Wraps nested object fields. */
  ObjectWrapper: React.ComponentType<ObjectWrapperProps>;
  /** Wraps array fields and owns the add-item action. */
  ArrayWrapper: React.ComponentType<ArrayWrapperProps>;
  /** Wraps one array item and owns the remove-item action. */
  ArrayElementWrapper: React.ComponentType<ArrayElementWrapperProps>;
}

export interface AutoFormFieldComponents {
  [key: string]: React.ComponentType<AutoFormFieldProps>;
}

// Wrapper prop types

export interface FieldWrapperProps {
  label: Renderable<ReactNode>;
  error?: Renderable<ReactNode>;
  children: ReactNode;
  id: string;
  parsedField: ParsedField;
}

export interface ArrayWrapperProps {
  label: Renderable<ReactNode>;
  error?: Renderable<ReactNode>;
  children: ReactNode;
  inputProps: any;
  parsedField: ParsedField;
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
  parsedField: ParsedField;
}

// Field component props

export interface AutoFormFieldProps {
  path: string[];
  id: string;
  error?: string;
  parsedField: ParsedField;
  label: Renderable<ReactNode>;
  inputProps: any;
}

// Context type

export interface AutoFormContextType {
  schema: ParsedSchema;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
}

// FieldConfig

export type FieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
  FieldWrapper = React.ComponentType<FieldWrapperProps>,
  ObjectWrapper = React.ComponentType<ObjectWrapperProps>,
  ArrayWrapper = React.ComponentType<ArrayWrapperProps>,
  ArrayElementWrapper = React.ComponentType<ArrayElementWrapperProps>,
> = BaseFieldConfig<
  ReactNode,
  FieldTypes,
  CustomData,
  FieldWrapper,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper
>;

// Re-exports

export type { SchemaProvider, ParsedField, ParsedSchema } from "@acp-autoform/core";
