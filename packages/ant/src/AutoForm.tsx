import {
  AutoFormUIComponents,
  AutoForm as BaseAutoForm,
} from "@autoform/react";
import { ConfigProvider } from "antd";
import { AutoFormProps } from "./types";
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

export function AutoForm<T extends Record<string, any>>({
  antFormProps,
  antProviderProps,
  uiComponents,
  formComponents,
  ...props
}: AutoFormProps<T>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const AntBaseForm = () => (
    <BaseAutoForm
      {...props}
      formProps={{ ...antFormProps, ...props.formProps }}
      uiComponents={{ ...AntUIComponents, ...uiComponents }}
      formComponents={{ ...AntAutoFormFieldComponents, ...formComponents }}
    />
  );

  return antProviderProps ? (
    <ConfigProvider {...antProviderProps}>
      <AntBaseForm />
    </ConfigProvider>
  ) : (
    <AntBaseForm />
  );
}
