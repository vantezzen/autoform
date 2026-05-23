import { useEffect } from "react";
import {
  useForm,
  FieldValues,
  FormProvider,
  UseFormProps,
  SubmitHandler,
  SubmitErrorHandler,
  Resolver,
  ResolverOptions,
  ResolverResult,
  DefaultValues,
} from "react-hook-form";
import {
  getDefaultValues,
  parseSchema,
  replaceEmptyValue,
} from "@autoform/core";
import { AutoFormProps } from "./types";
import { AutoFormProvider } from "./context";
import { AutoFormField } from "./AutoFormField";
import { focusError, preventPropagation } from "./utils";

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

  const resolver: Resolver<T> = async (
    values: T,
    ctx: any,
    options: ResolverOptions<T>
  ): Promise<ResolverResult<T>> => {
    const cleanedValues = replaceEmptyValue(values);
    return schema.resolver(cleanedValues, ctx, options);
  };

  const methods = useForm<T, any, T>({
    formControl: form?.formControl as UseFormProps<T>["formControl"],
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as DefaultValues<T>,
    shouldFocusError: false,
    values: values as T,
    resolver,
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
            methods.handleSubmit(handleSubmit, handleError)
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
