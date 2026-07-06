import { useEffect } from "react";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import type { AnyFormApi, AnyFormOptions } from "@tanstack/react-form";
import type { UseFieldFn } from "../types";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});

export function useExternalFormOptions(
  form: AnyFormApi | undefined,
  options: AnyFormOptions,
): void {
  useEffect(() => {
    if (!form) return;

    const merged = {
      validators: options.validators,
      validationLogic: options.validationLogic,
      onSubmitInvalid: options.onSubmitInvalid,
      ...form.options,
      defaultValues: options.defaultValues,
      onSubmit: options.onSubmit,
    };

    form.update(merged);
    form.options = merged;
  }, [form, options]);
}

export const useFieldTanStack: UseFieldFn = () => {
  const fieldApi = useFieldContext();

  return {
    field: {
      value: fieldApi.state.value,
      onChange: (valueOrEvent: any) => {
        const target = valueOrEvent?.target;
        fieldApi.handleChange(
          target
            ? target.type === "checkbox"
              ? target.checked
              : target.value
            : valueOrEvent,
        );
      },
      onBlur: () => fieldApi.handleBlur(),
      name: String(fieldApi.name).replace(/\[(\d+)\]/g, ".$1"),
    },
  };
};

export function useSyncValues(
  form: { setFieldValue: (field: any, value: any, opts?: any) => void },
  values?: Record<string, any>,
) {
  useEffect(() => {
    if (!values) return;

    for (const [key, value] of Object.entries(values)) {
      form.setFieldValue(key, value, { dontUpdateMeta: true });
    }
  }, [form, values]);
}
