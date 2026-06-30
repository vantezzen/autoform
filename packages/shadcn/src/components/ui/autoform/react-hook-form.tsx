"use client";

import { AutoForm as ReactHookFormAutoForm } from "@dual-autoform/react/react-hook-form";
import type {
  AutoFormUIComponents,
  AutoFormProps as BaseAutoFormProps,
  ExtendableAutoFormProps,
} from "@dual-autoform/react";

import { Form } from "./components/Form";
import { FieldWrapper } from "./components/FieldWrapper";
import { ErrorMessage } from "./components/ErrorMessage";
import { SubmitButton } from "./components/SubmitButton";
import { ObjectWrapper } from "./components/ObjectWrapper";
import { ArrayWrapper } from "./components/ArrayWrapper";
import { ArrayElementWrapper } from "./components/ArrayElementWrapper";
import { StringField } from "./components/rhf/StringField";
import { NumberField } from "./components/rhf/NumberField";
import { BooleanField } from "./components/rhf/BooleanField";
import { DateField } from "./components/rhf/DateField";
import { SelectField } from "./components/rhf/SelectField";

export type FieldTypes = "string" | "number" | "boolean" | "date" | "select";
export type { ExtendableAutoFormProps as AutoFormProps } from "@dual-autoform/react";

const UIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

const RHFFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;

export function AutoForm<T extends Record<string, any> = Record<string, any>>({
  uiComponents,
  formComponents,
  ...props
}: ExtendableAutoFormProps<T>) {
  return (
    <ReactHookFormAutoForm
      {...(props as BaseAutoFormProps<T>)}
      uiComponents={{ ...UIComponents, ...uiComponents }}
      formComponents={{ ...RHFFieldComponents, ...formComponents }}
    />
  );
}
