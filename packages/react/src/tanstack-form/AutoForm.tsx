import React, { useEffect, useMemo } from "react";
import { formOptions, revalidateLogic } from "@tanstack/react-form";
import {
  getDefaultValues,
  parseSchema,
  replaceEmptyValue,
} from "@acp-autoform/core";
import type { AutoFormProps } from "../types";
import { AutoFormProvider } from "../context";
import { AutoFormField } from "./AutoFormField";
import { focusFirstInvalidInput, preventPropagation } from "../utils";
import { createSchemaValidator, getAppForm } from "./utils";
import {
  useAppForm,
  useExternalFormOptions,
  useSyncValues,
} from "./hooks";

export function AutoForm<T extends Record<string, any> = Record<string, any>>({
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
  const parsedSchema = useMemo(() => parseSchema(schema), [schema]);
  const {
    ref: _ref,
    removeEmptyValue = true,
    ...restFormProps
  } = formProps as React.ComponentProps<"form"> & {
    removeEmptyValue?: boolean;
  };

  const options = useMemo(() => {
    return formOptions({
      validators: {
        onDynamic: createSchemaValidator<T>(schema, removeEmptyValue),
      },
      validationLogic: revalidateLogic(),
      onSubmitInvalid: focusFirstInvalidInput,
      defaultValues: {
        ...(getDefaultValues(schema) as Partial<T>),
        ...defaultValues,
      } as T,
      onSubmit: async ({ value, formApi }: { value: T; formApi: any }) => {
        const validation = schema.validateSchema(
          removeEmptyValue ? replaceEmptyValue(value) : value,
        );
        if (validation.success) {
          await onSubmit(validation.data, formApi);
        }
      },
    });
  }, [defaultValues, onSubmit, removeEmptyValue, schema]);

  const internalForm = useAppForm(options);
  const form = (formControl ?? internalForm) as typeof internalForm;

  useSyncValues(form, values);
  useExternalFormOptions(formControl, options);

  useEffect(() => {
    onFormInit?.(form);
  }, [form, onFormInit]);

  const AppForm = getAppForm(form);

  return (
    <AppForm>
      <AutoFormProvider
        value={{
          schema: parsedSchema,
          uiComponents,
          formComponents,
        }}
      >
        <uiComponents.Form
          onSubmit={preventPropagation(() => {
            void form.handleSubmit();
          })}
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
    </AppForm>
  );
}
