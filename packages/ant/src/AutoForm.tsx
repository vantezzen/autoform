import {
  AutoFormUIComponents,
  AutoForm as BaseAutoForm,
} from "@autoform/react";
import { ConfigProvider } from "antd";
import { FieldValues } from "react-hook-form";
import { ArrayElementWrapper } from "./components/ArrayElementWrapper";
import { ArrayWrapper } from "./components/ArrayWrapper";
import { BooleanField } from "./components/BooleanField";
import { DateField } from "./components/DateField";
import { ErrorMessage } from "./components/ErrorMessage";
import { FieldWrapper } from "./components/FieldWrapper";
import { Form } from "./components/Form";
import { NumberField } from "./components/NumberField";
import { ObjectWrapper } from "./components/ObjectWrapper";
import { SelectField } from "./components/SelectField";
import { StringField } from "./components/StringField";
import { SubmitButton } from "./components/SubmitButton";
import { AntAutoFormProps } from "./types";
import FormProvider from "./Context/Form";

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
export function AutoForm<T extends FieldValues>({
  uiComponents,
  formComponents,
  ...props
}: AntAutoFormProps<T>) {
  return (
    <ConfigProvider {...props.AntProviderProps}>
      <FormProvider formProps={props.AntFormProps}>
        <BaseAutoForm
          {...props}
          uiComponents={{
            ...AntUIComponents,
            ...uiComponents,
          }}
          formComponents={{ ...AntAutoFormFieldComponents, ...formComponents }}
        />
      </FormProvider>
    </ConfigProvider>
  );
}
