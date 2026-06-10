import React, { useEffect } from "react";
import { useForm, createFormHookContexts, useStore, type ReactFormExtendedApi } from "@tanstack/react-form";
import { getDefaultValues, parseSchema } from "@acp-autoform/core";
import type { ParsedSchema } from "@acp-autoform/core";
import type { AutoFormProps, UseFieldFn } from "../types";
import { AutoFormProvider } from "../context";
import { AutoFormField } from "./AutoFormField";
import { preventPropagation, createSchemaValidator, focusFirstInvalidInput } from "./utils";

type FormApi = ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>;

// Field context — set up once for this adapter.
// useFieldContext() reads from this when UI components call useField().
export const { fieldContext, useFieldContext } = createFormHookContexts();
export const ErrorMapContext = React.createContext<any>(undefined);

/**
 * TanStack-backed useField implementation.
 * Normalizes FieldApi to the shared FieldBinding shape.
 */
const useFieldTanStack: UseFieldFn = (_opts) => {
  const fieldApi = useFieldContext();
  return {
    field: {
      value: fieldApi.state.value,
      onChange: (valueOrEvent: any) => {
        // Handle both raw values and React synthetic events
        const value =
          valueOrEvent?.target !== undefined
            ? valueOrEvent.target.type === "checkbox"
              ? valueOrEvent.target.checked
              : valueOrEvent.target.value
            : valueOrEvent;
        fieldApi.handleChange(value);
      },
      onBlur: () => fieldApi.handleBlur(),
      name: fieldApi.name,
    },
  };
};

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
  const { ref: _ref, ...restFormProps } = formProps as React.ComponentProps<"form">;
  const parsedSchema: ParsedSchema = parseSchema(schema);
  const validator = createSchemaValidator(schema);

  const form = useForm({
    // If an external form instance is passed, use it directly
    ...(formControl ? { form: formControl as FormApi } : {}),
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as T,
    ...(validator ? { validators: { onChange: validator as any } } : {}),
    onSubmit: async ({ value }: { value: T }) => {
      await onSubmit(value, form);
    },
    onSubmitInvalid: () => {
      focusFirstInvalidInput();
    },
  });

  // Sync controlled external values
  useEffect(() => {
    if (values) {
      (form as any).setValues(values as T, { touch: false });
    }
  }, [values]);

  useEffect(() => {
    onFormInit?.(form);
  }, []);

  const errorMapStr = useStore(form.store, (state: any) => JSON.stringify(state.errorMap));
  const errorMap = errorMapStr ? JSON.parse(errorMapStr) : undefined;

  return (
    <ErrorMapContext.Provider value={errorMap}>
        <fieldContext.Provider value={null as any}>
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
                  form={form as FormApi}
                />
              ))}
              {withSubmit && (
                <uiComponents.SubmitButton>Submit</uiComponents.SubmitButton>
              )}
              {children}
            </uiComponents.Form>
          </AutoFormProvider>
        </fieldContext.Provider>
      </ErrorMapContext.Provider>
  );
}
