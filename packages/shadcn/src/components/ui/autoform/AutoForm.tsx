import type {
  AutoFormUIComponents,
  AutoFormProps,
  ExtendableAutoFormProps,
} from "@acp-autoform/react";
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
import React from "react";

const ShadcnUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

export const ShadcnAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;
export type FieldTypes = keyof typeof ShadcnAutoFormFieldComponents;

/**
 * Factory that binds the Shadcn component registry to any BaseAutoForm.
 * Usage: const ShadcnAutoForm = createAutoForm(AutoForm) where AutoForm
 * is imported from "@acp-autoform/react/react-hook-form" or "@acp-autoform/react/tanstack-form".
 */
export function createAutoForm<T extends Record<string, any>>(
  BaseAutoForm: React.ComponentType<AutoFormProps<T>>,
) {
  return function ShadcnAutoForm({
    uiComponents,
    formComponents,
    ...props
  }: ExtendableAutoFormProps<T>) {
    return (
      <BaseAutoForm
        {...(props as AutoFormProps<T>)}
        uiComponents={{ ...ShadcnUIComponents, ...uiComponents }}
        formComponents={{ ...ShadcnAutoFormFieldComponents, ...formComponents }}
      />
    );
  };
}

// Convenience default export with empty base (for backward compat discovery)
export { ShadcnUIComponents };
