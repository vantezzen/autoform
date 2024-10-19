import React, { useEffect } from "react";
import { useForm, FormProvider, DefaultValues } from "react-hook-form";
import {
  parseSchema,
  getDefaultValues,
  removeEmptyValues,
} from "@autoform/core";
import { AutoFormProps } from "./types";
import { AutoFormProvider } from "./context";
import { AutoFormField } from "./AutoFormField";

export function AutoForm<T extends Record<string, any>>({
  schema,
  onSubmit = () => {},
  defaultValues,
  values,
  children,
  uiComponents,
  formComponents,
  withSubmit = false,
  onFormInit = () => {},
}: AutoFormProps<T>) {
  const parsedSchema = parseSchema(schema);
  const methods = useForm<T>({
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as DefaultValues<T>,
    values: values as T,
  });

  useEffect(() => {
    if (onFormInit) {
      onFormInit(methods);
    }
  }, [onFormInit, methods]);

  const handleSubmit = async (dataRaw: T) => {
    const data = removeEmptyValues(dataRaw);
    const validationResult = schema.validateSchema(data as T);
    if (validationResult.success) {
      await onSubmit(validationResult.data, methods);
    } else {
      const newErrors: Record<string, string> = {};
      methods.clearErrors();
      validationResult.errors?.forEach((error) => {
        const path = error.path.join(".");
        newErrors[path] = error.message;
        methods.setError(path as any, {
          type: "custom",
          message: error.message,
        });
      });
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
        <uiComponents.Form onSubmit={methods.handleSubmit(handleSubmit)}>
          {parsedSchema.fields.map((field) => (
            <AutoFormField key={field.key} field={field} path={[field.key]} />
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
