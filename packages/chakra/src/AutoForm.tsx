import {
  AutoFormUIComponents,
  AutoForm as BaseAutoForm,
} from "@autoform/react";
import { AutoFormProps } from "./types";
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

export function AutoForm<T extends Record<string, any>>({
  uiComponents,
  formComponents,
  ...props
}: AutoFormProps<T>) {
  return (
    <Provider>
      <BaseAutoForm
        {...props}
        uiComponents={{ ...ChakraUIComponents, ...uiComponents }}
        formComponents={{ ...ChakraAutoFormFieldComponents, ...formComponents }}
      />
    </Provider>
  );
}
