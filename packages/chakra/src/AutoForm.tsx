"use client";

import { useState, useEffect } from "react";
import {
  AutoFormUIComponents,
  AutoFormComponent,
  AutoFormProps as BaseAutoFormProps,
  UseFieldFn,
} from "@acp-autoform/react";
import type { AutoFormProps as ChakraAutoFormProps } from "./types";
import { FieldHookProvider } from "./field-context";
import { Form } from "./components/autoform/Form";
import { FieldWrapper } from "./components/autoform/FieldWrapper";
import { ErrorMessage } from "./components/autoform/ErrorMessage";
import { SubmitButton } from "./components/autoform/SubmitButton";
import { StringField } from "./components/autoform/StringField";
import { NumberField } from "./components/autoform/NumberField";
import { BooleanField } from "./components/autoform/BooleanField";
import { DateField } from "./components/autoform/DateField";
import { SelectField } from "./components/autoform/SelectField";
import { ObjectWrapper } from "./components/autoform/ObjectWrapper";
import { ArrayWrapper } from "./components/autoform/ArrayWrapper";
import { ArrayElementWrapper } from "./components/autoform/ArrayElementWrapper";
import { Provider } from "./components/ui/provider";

const ChakraUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

const ChakraAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;
export type FieldTypes = keyof typeof ChakraAutoFormFieldComponents;

/**
 * Factory that binds the Chakra UI component registry to a specific form adapter.
 */
export function createAutoForm(
  BaseAutoForm: AutoFormComponent,
  useField: UseFieldFn,
) {
  return function ChakraAutoForm<
    T extends Record<string, any> = Record<string, any>,
  >({
    uiComponents,
    formComponents,
    colorModeProps,
    ...props
  }: ChakraAutoFormProps<T>) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
      <Provider {...(colorModeProps as any)}>
        <FieldHookProvider value={useField}>
          <BaseAutoForm
            {...(props as BaseAutoFormProps<T>)}
            uiComponents={{ ...ChakraUIComponents, ...uiComponents }}
            formComponents={{ ...ChakraAutoFormFieldComponents, ...formComponents }}
          />
        </FieldHookProvider>
      </Provider>
    );
  };
}

export { ChakraUIComponents, ChakraAutoFormFieldComponents };
