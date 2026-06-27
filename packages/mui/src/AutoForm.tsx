"use client";

import {
  AutoFormUIComponents,
  AutoFormComponent,
  AutoFormProps as BaseAutoFormProps,
  UseFieldFn,
} from "@dual-autoform/react";
import { ThemeProvider } from "@mui/material/styles";
import type { AutoFormProps as MuiAutoFormProps } from "./types";
import { FieldHookProvider } from "./field-context";
import { Form } from "./components/Form";
import { FieldWrapper } from "./components/FieldWrapper";
import { ErrorMessage } from "./components/ErrorMessage";
import { SubmitButton } from "./components/SubmitButton";
import { StringField } from "./components/StringField";
import { NumberField } from "./components/NumberField";
import { BooleanField } from "./components/BooleanField";
import { DateField } from "./components/DateField";
import { SelectField } from "./components/SelectField";
import { ObjectWrapper } from "./components/ObjectWrapper";
import { ArrayWrapper } from "./components/ArrayWrapper";
import { ArrayElementWrapper } from "./components/ArrayElementWrapper";

const MuiUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

export const MuiAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;
export type FieldTypes = keyof typeof MuiAutoFormFieldComponents;

/**
 * Factory that binds the MUI component registry to a specific form adapter.
 */
export function createAutoForm(
  BaseAutoForm: AutoFormComponent,
  useField: UseFieldFn,
) {
  return function MuiAutoForm<
    T extends Record<string, any> = Record<string, any>,
  >({
    theme,
    uiComponents,
    formComponents,
    ...props
  }: MuiAutoFormProps<T>) {
    const form = (
      <FieldHookProvider value={useField}>
        <BaseAutoForm
          {...(props as BaseAutoFormProps<T>)}
          uiComponents={{ ...MuiUIComponents, ...uiComponents }}
          formComponents={{ ...MuiAutoFormFieldComponents, ...formComponents }}
        />
      </FieldHookProvider>
    );
    return theme ? <ThemeProvider theme={theme}>{form}</ThemeProvider> : form;
  };
}

export { MuiUIComponents };
