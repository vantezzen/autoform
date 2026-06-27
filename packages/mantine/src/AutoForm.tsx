"use client";

import {
  AutoFormUIComponents,
  AutoFormComponent,
  AutoFormProps as BaseAutoFormProps,
  UseFieldFn,
} from "@dual-autoform/react";
import { MantineProvider } from "@mantine/core";
import type { AutoFormProps as MantineAutoFormProps } from "./types";
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

const MantineUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

export const MantineAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;
export type FieldTypes = keyof typeof MantineAutoFormFieldComponents;

/**
 * Factory that binds the Mantine component registry to a specific form adapter.
 */
export function createAutoForm(
  BaseAutoForm: AutoFormComponent,
  useField: UseFieldFn,
) {
  return function MantineAutoForm<
    T extends Record<string, any> = Record<string, any>,
  >({
    theme,
    uiComponents,
    formComponents,
    ...props
  }: MantineAutoFormProps<T>) {
    const form = (
      <FieldHookProvider value={useField}>
        <BaseAutoForm
          {...(props as BaseAutoFormProps<T>)}
          uiComponents={{ ...MantineUIComponents, ...uiComponents }}
          formComponents={{ ...MantineAutoFormFieldComponents, ...formComponents }}
        />
      </FieldHookProvider>
    );
    return theme ? <MantineProvider theme={theme}>{form}</MantineProvider> : form;
  };
}

export { MantineUIComponents };
