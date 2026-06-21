"use client";

import {
  AutoFormUIComponents,
  AutoFormComponent,
  AutoFormProps as BaseAutoFormProps,
} from "@acp-autoform/react";
import { ThemeProvider } from "@mui/material/styles";
import type { AutoFormProps as MuiAutoFormProps } from "./types";
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
 * Factory that binds the MUI component registry to any BaseAutoForm.
 * Usage: const MuiAutoForm = createAutoForm(AutoForm) where AutoForm is
 * imported from "@acp-autoform/react/react-hook-form" or "@acp-autoform/react/tanstack-form".
 */
export function createAutoForm(BaseAutoForm: AutoFormComponent) {
  return function MuiAutoForm<
    T extends Record<string, any> = Record<string, any>,
  >({
    theme,
    uiComponents,
    formComponents,
    ...props
  }: MuiAutoFormProps<T>) {
    const form = (
      <BaseAutoForm
        {...(props as BaseAutoFormProps<T>)}
        uiComponents={{ ...MuiUIComponents, ...uiComponents }}
        formComponents={{ ...MuiAutoFormFieldComponents, ...formComponents }}
      />
    );
    return theme ? <ThemeProvider theme={theme}>{form}</ThemeProvider> : form;
  };
}

export { MuiUIComponents };
