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
  AntFormProps,
  AntProviderProps,
  uiComponents,
  formComponents,
  ...props
}: AutoFormProps<T>) {
  const AntBaseForm = () => (
    <BaseAutoForm
      {...props}
      formProps={{ ...AntFormProps, ...props.formProps }}
      uiComponents={{ ...AntUIComponents, ...uiComponents }}
      formComponents={{ ...AntAutoFormFieldComponents, ...formComponents }}
    />
  );

  return AntProviderProps ? (
    <ConfigProvider {...AntProviderProps}>
      <AntBaseForm />
    </ConfigProvider>
  ) : (
    <AntBaseForm />
  );
}
