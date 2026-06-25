import { useEffect, useRef } from "react";
import {
  useForm,
  FieldValues,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
  DefaultValues,
} from "react-hook-form";
import { getDefaultValues, parseSchema } from "@acp-autoform/core";
import type { AutoFormProps } from "../types";
import { AutoFormProvider } from "../context";
import { AutoFormField } from "./AutoFormField";
import { focusFirstInvalidInput, preventPropagation } from "../utils";
import { createSchemaResolver } from "./utils";

export function AutoForm<T extends FieldValues = FieldValues>({
  formControl,
  schema,
  onSubmit = () => {},
  values,
  defaultValues,
  children,
  uiComponents,
  formComponents,
  withSubmit = false,
  onFormInit,
  formProps = {},
}: AutoFormProps<T>) {
  const shouldFocusError = useRef(
    formControl?.control?._options?.shouldFocusError !== false,
  ).current;
  const { ref: _ref, ...restFormProps } = formProps;
  const parsedSchema = parseSchema(schema);
  const resolver = createSchemaResolver(schema);

  const methods = useForm<T, any, T>({
    resolver,
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as DefaultValues<T>,
    values: values as T,
    formControl,
    shouldFocusError: false,
  });

  useEffect(() => {
    onFormInit?.(methods);
  }, [methods, onFormInit]);

  const handleSubmit: SubmitHandler<T> = async (data: T, e) => {
    await onSubmit(data, methods, e);
  };

  const handleError: SubmitErrorHandler<T> = () => {
    if (shouldFocusError) {
      focusFirstInvalidInput();
    }
  };

  return (
    <FormProvider {...methods}>
      <AutoFormProvider
        value={{
          schema: parsedSchema,
          uiComponents,
          formComponents,
        }}
      >
        <uiComponents.Form
          onSubmit={preventPropagation(
            methods.handleSubmit(handleSubmit, handleError),
          )}
          ref={_ref}
          {...restFormProps}
        >
          {parsedSchema.fields.map((field) => (
            <AutoFormField
              key={field.key}
              parsedField={field}
              path={[field.key]}
            />
          ))}
          {withSubmit && (
            <uiComponents.SubmitButton>Submit</uiComponents.SubmitButton>
          )}
          {children}
        </uiComponents.Form>
      </AutoFormProvider>
    </FormProvider>
  );
}
