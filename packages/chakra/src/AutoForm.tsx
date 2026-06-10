import React, { useState, useEffect } from "react";
import {
  AutoFormUIComponents,
  AutoFormProps,
  ExtendableAutoFormProps,
} from "@acp-autoform/react";
import type { AutoFormProps as ChakraAutoFormProps } from "./types";
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
 * Factory that binds the Chakra UI component registry to any BaseAutoForm.
 */
export function createAutoForm<T extends Record<string, any>>(
  BaseAutoForm: React.ComponentType<AutoFormProps<T>>,
) {
  return function ChakraAutoForm({
    uiComponents,
    formComponents,
    colorModeProps,
    ...props
  }: ExtendableAutoFormProps<T> & ChakraAutoFormProps<T>) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
      <Provider {...(colorModeProps as any)}>
        <BaseAutoForm
          {...(props as AutoFormProps<T>)}
          uiComponents={{ ...ChakraUIComponents, ...uiComponents }}
          formComponents={{ ...ChakraAutoFormFieldComponents, ...formComponents }}
        />
      </Provider>
    );
  };
}

export { ChakraUIComponents, ChakraAutoFormFieldComponents };
