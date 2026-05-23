import { useEffect } from "react";
import {
  useForm,
  FieldValues,
  FormProvider,
  UseFormProps,
  SubmitHandler,
  SubmitErrorHandler,
  DefaultValues,
} from "react-hook-form";
import { getDefaultValues, parseSchema } from "@autoform/core";
import { AutoFormProps } from "./types";
import { AutoFormProvider } from "./context";
import { AutoFormField } from "./AutoFormField";
import { createSchemaResolver, focusError, preventPropagation } from "./utils";

export function AutoForm<T extends FieldValues = FieldValues>({
  form,
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
  const shouldFocusError = form?.shouldFocusError !== false;
  const { ref: _ref, ...restFormProps } = formProps;
  const parsedSchema = parseSchema(schema);
  const resolver = createSchemaResolver(schema);

  const methods = useForm<T, any, T>({
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as DefaultValues<T>,
    shouldFocusError: false,
    values: values as T,
    resolver,
    formControl: form?.formControl as UseFormProps<T>["formControl"],
  });

  useEffect(() => {
    onFormInit?.(methods);
  }, [methods, onFormInit]);

  const handleSubmit: SubmitHandler<T> = async (data: T, e) => {
    await onSubmit(data, methods, e);
  };

  const handleError: SubmitErrorHandler<T> = (errors) => {
    if (shouldFocusError) {
      focusError(errors);
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
          ref={formProps?.ref}
          {...restFormProps}
        >
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
