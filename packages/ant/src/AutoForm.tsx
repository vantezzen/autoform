"use client";

import {
  AutoFormUIComponents,
  AutoFormComponent,
  AutoFormProps as BaseAutoFormProps,
  UseFieldFn,
} from "@acp-autoform/react";
import { ConfigProvider } from "antd";
import type { AutoFormProps as AntAutoFormProps } from "./types";
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
import { useEffect, useState } from "react";
import "@ant-design/v5-patch-for-react-19";

const AntUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

const AntAutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;
export type FieldTypes = keyof typeof AntAutoFormFieldComponents;

/**
 * Factory that binds the Ant Design component registry to a specific form adapter.
 */
export function createAutoForm(
  BaseAutoForm: AutoFormComponent,
  useField: UseFieldFn,
) {
  return function AntAutoForm<
    T extends Record<string, any> = Record<string, any>,
  >({
    antFormProps,
    antProviderProps,
    uiComponents,
    formComponents,
    ...props
  }: AntAutoFormProps<T>) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const form = (
      <FieldHookProvider value={useField}>
        <BaseAutoForm
          {...(props as BaseAutoFormProps<T>)}
          formProps={{ ...antFormProps, ...(props as any).formProps }}
          uiComponents={{ ...AntUIComponents, ...uiComponents }}
          formComponents={{ ...AntAutoFormFieldComponents, ...formComponents }}
        />
      </FieldHookProvider>
    );

    return antProviderProps ? (
      <ConfigProvider {...antProviderProps}>{form}</ConfigProvider>
    ) : (
      form
    );
  };
}

export { AntUIComponents, AntAutoFormFieldComponents };
