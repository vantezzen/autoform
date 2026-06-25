"use client";

import type {
  AutoFormUIComponents,
  AutoFormComponent,
  AutoFormProps as BaseAutoFormProps,
  AutoFormFieldComponents,
  ExtendableAutoFormProps,
} from "@acp-autoform/react";
import { Form } from "./components/Form";
import { FieldWrapper } from "./components/FieldWrapper";
import { ErrorMessage } from "./components/ErrorMessage";
import { SubmitButton } from "./components/SubmitButton";
import { ObjectWrapper } from "./components/ObjectWrapper";
import { ArrayWrapper } from "./components/ArrayWrapper";
import { ArrayElementWrapper } from "./components/ArrayElementWrapper";

const ShadcnUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

export type FieldTypes = "string" | "number" | "boolean" | "date" | "select";

/**
 * Factory that binds the Shadcn UI component registry to any BaseAutoForm.
 * The adapter-specific entry points (react-hook-form.tsx / tanstack-form.tsx)
 * provide their own field components that use their respective form hooks.
 */
export function createAutoForm(
  BaseAutoForm: AutoFormComponent,
  defaultFieldComponents: AutoFormFieldComponents,
) {
  return function ShadcnAutoForm<
    T extends Record<string, any> = Record<string, any>,
  >({
    uiComponents,
    formComponents,
    ...props
  }: ExtendableAutoFormProps<T>) {
    return (
      <BaseAutoForm
        {...(props as BaseAutoFormProps<T>)}
        uiComponents={{ ...ShadcnUIComponents, ...uiComponents }}
        formComponents={{ ...defaultFieldComponents, ...formComponents }}
      />
    );
  };
}

export { ShadcnUIComponents };
