import React from "react";
import {
  AutoFormUIComponents,
  AutoFormProps,
  ExtendableAutoFormProps,
} from "@acp-autoform/react";
import { MantineProvider } from "@mantine/core";
import type { AutoFormProps as MantineAutoFormProps } from "./types";
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
 * Factory that binds the Mantine component registry to any BaseAutoForm.
 */
export function createAutoForm<T extends Record<string, any>>(
  BaseAutoForm: React.ComponentType<AutoFormProps<T>>,
) {
  return function MantineAutoForm({
    theme,
    uiComponents,
    formComponents,
    ...props
  }: ExtendableAutoFormProps<T> & MantineAutoFormProps<T>) {
    const form = (
      <BaseAutoForm
        {...(props as AutoFormProps<T>)}
        uiComponents={{ ...MantineUIComponents, ...uiComponents }}
        formComponents={{ ...MantineAutoFormFieldComponents, ...formComponents }}
      />
    );
    return theme ? <MantineProvider theme={theme}>{form}</MantineProvider> : form;
  };
}

export { MantineUIComponents };
