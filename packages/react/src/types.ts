import { ReactNode } from "react";
import {
  ParsedField,
  ParsedSchema,
  Renderable,
  FieldConfig as BaseFieldConfig,
  SchemaProvider,
} from "@acp-autoform/core";
import {
  createFormControl,
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";

export type { FieldValues } from "react-hook-form";

export interface AutoFormProps<T extends FieldValues = FieldValues> {
  /** Schema adapter that manaages fields, default values, and schema validation. */
  schema: SchemaProvider<T>;
  /**
   * External formControl returned by react-hook-form`s  createFormControl.
   * Use it when a parent needs to call form methods.
   */
  formControl?: ReturnType<typeof createFormControl>["formControl"];
  /**
   * Runs after successful validation. Receives the values, form instance, and submit event.
   * @default () => {}
   */
  onSubmit?: (
    values: T,
    form: UseFormReturn<T, any, T>,
    e?: React.BaseSyntheticEvent,
  ) => void | Promise<void>;
  /**
   * Initial values. It merges over the default values inferred from the schema.
   * @default inferred from schema
   */
  defaultValues?: Partial<T>;
  /** Controlled values that update the form values. */
  values?: Partial<T>;
  /** Extra UI rendered after the generated fields */
  children?: ReactNode;
  /** Layout/wrapper components used to render fields, errors, and structure. */
  uiComponents: AutoFormUIComponents;
  /** Form components mapped as field type, such as `string`, `number`, or `select`. */
  formComponents: AutoFormFieldComponents;
  /**
   * Show the default submit button after all the fields.
   * @default false
   */
  withSubmit?: boolean;
  /**
   * Legacy hook to access the react‑hook‑form instance
   * @deprecated Prefer passing an external form control through the `formControl` prop. */
  onFormInit?: (form: UseFormReturn<T, any, T>) => void;
  /**
   * Props forwarded to the underlying <form> element.
   * @default {}
   */
  formProps?: React.ComponentProps<"form"> | Record<string, any>;
}

export type ExtendableAutoFormProps<T extends FieldValues> = Omit<
  AutoFormProps<T>,
  "uiComponents" | "formComponents"
> & {
  uiComponents?: Partial<AutoFormUIComponents>;
  formComponents?: Partial<AutoFormFieldComponents>;
};

export interface AutoFormUIComponents {
  /** Root form element. Receives the generated submit handler and form props. */
  Form: React.ComponentType<React.ComponentProps<"form">>;
  /** Wraps each generated field with label, error, and layout UI. */
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
  /** Component used for a field type, for example string, number, select, or fallback. */
  [key: string]: React.ComponentType<AutoFormFieldProps>;
}

export interface FieldWrapperProps {
  /** Resolved field label from field config or schema metadata. */
  label: Renderable<ReactNode>;
  /** Current validation error for this field, when present. */
  error?: Renderable<ReactNode>;
  /** The concrete field component to render inside the wrapper. */
  children: ReactNode;
  /** Dot-separated field path, suitable for htmlFor/id wiring. */
  id: string;
  /** Parsed field metadata from the schema provider. */
  field: ParsedField;
}

export interface ArrayWrapperProps {
  /** Resolved array field label. */
  label: Renderable<ReactNode>;
  /** Current validation error for the array field, when present. */
  error?: Renderable<ReactNode>;
  /** Rendered array item fields. */
  children: ReactNode;
  /** Props from fieldConfig.inputProps, including focus refs used for errors. */
  inputProps: any;
  /** Parsed array field metadata. */
  field: ParsedField;
  /** Adds a new array item. */
  onAddItem: () => void;
}

export interface ArrayElementWrapperProps {
  /** Rendered fields for this array item. */
  children: ReactNode;
  /** Removes this array item. */
  onRemove: () => void;
  /** Zero-based item index. */
  index: number;
}

export interface ObjectWrapperProps {
  /** Resolved object field label. */
  label: Renderable<ReactNode>;
  /** Rendered child fields for the object. */
  children: ReactNode;
  /** Parsed object field metadata. */
  field: ParsedField;
}

export interface AutoFormFieldProps {
  /** Field path split into segments. */
  path: string[];
  /** Dot-separated field path, used as the field name and element id. */
  id: string;
  /** Current validation error for this field, when present. */
  error?: string;
  /** Parsed field metadata from the schema provider. */
  field: ParsedField;
  /** Resolved field label from field config or schema metadata. */
  label: Renderable<ReactNode>;
  /** Hook factory that connects the component to react-hook-form. */
  useField: FieldReturn;
  /** Props passed through from fieldConfig.inputProps. */
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

export type FieldReturn<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = (
  props?: Omit<
    UseControllerProps<TFieldValues, TName, TTransformedValues>,
    "name"
  >,
) => {
  [key: string]: any;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: any;
  disabled?: boolean;
  name: TName;
  ref: (instance: any) => void;
};
