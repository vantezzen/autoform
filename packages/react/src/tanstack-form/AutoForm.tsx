import React, { useEffect, useMemo } from "react";
import { formOptions, revalidateLogic } from "@tanstack/react-form";
import {
  getDefaultValues,
  parseSchema,
  replaceEmptyValue,
} from "@acp-autoform/core";
import type { AutoFormProps } from "../types";
import { AutoFormProvider } from "@acp-autoform/react";
import { AutoFormField } from "./AutoFormField";
import { focusFirstInvalidInput, preventPropagation } from "../utils";
import { getAppForm } from "./utils";
import {
  useAppForm,
  useExternalFormOptions,
  useFieldTanStack,
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
  const { ref: _ref, ...restFormProps } =
    formProps as React.ComponentProps<"form">;

  const options = useMemo(
    () => {
      const validator = schema.getSchema?.();
      return formOptions({
        ...(validator ? { validators: { onDynamic: validator as any } } : {}),
        validationLogic: revalidateLogic(),
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
        onSubmitInvalid: focusFirstInvalidInput,
      });
    },
    [defaultValues, onSubmit, schema],
  );

  const internalForm = useAppForm(options);
  const form = (formControl ?? internalForm) as typeof internalForm;

  useSyncValues(form, values);
  useExternalFormOptions(formControl as typeof internalForm, options);

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
