import React, { useEffect, useMemo } from "react";
import { formOptions } from "@tanstack/react-form";
import {
  getDefaultValues,
  parseSchema,
  replaceEmptyValue,
} from "@acp-autoform/core";
import type { ParsedSchema } from "@acp-autoform/core";
import type { AutoFormProps } from "../types";
import { AutoFormProvider } from "../context";
import { AutoFormField } from "./AutoFormField";
import {
  getAppForm,
  preventPropagation,
  focusFirstInvalidInput,
} from "./utils";
import { useAppForm } from "./form-context";
import { useFieldTanStack, useSyncValues } from "./hooks";

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
  const parsedSchema: ParsedSchema = useMemo(
    () => parseSchema(schema),
    [schema],
  );
  const validator = useMemo(() => schema.getSchema?.(), [schema]);
  const { ref: _ref, ...restFormProps } =
    formProps as React.ComponentProps<"form">;

  const options = useMemo(
    () =>
      formOptions({
        ...(validator ? { validators: { onChange: validator as any } } : {}),
        defaultValues: {
          ...(getDefaultValues(schema) as Partial<T>),
          ...defaultValues,
        } as T,
        onSubmit: async ({ value, formApi }: { value: T; formApi: any }) => {
          const validation = schema.validateSchema(replaceEmptyValue(value));
          if (validation.success) {
            await onSubmit(validation.data, formApi);
          }
        },
        onSubmitInvalid: () => {
          focusFirstInvalidInput();
        },
      }),
    [defaultValues, onSubmit, schema, validator],
  );

  const internalForm = useAppForm(options);
  const form = formControl
    ? (formControl as typeof internalForm)
    : internalForm;

  useSyncValues(form, values);

  useEffect(() => {
    if (formControl) {
      (formControl as typeof internalForm).update(options);
    }
  }, [formControl, options]);

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
          useField: useFieldTanStack,
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
