import { useEffect } from "react";
import {
  createFormHook,
  createFormHookContexts,
  useIsomorphicLayoutEffect,
} from "@tanstack/react-form";
import type { UseFieldFn } from "../types";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

const { useAppForm: useBaseAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});

type Options = Record<string, any>;
type Form = {
  options: Options;
  update: (options: Options) => void;
};
type OptionsState = { external: Options; autoForm?: Options };

const optionsByForm = new WeakMap<Form, OptionsState>();

function getOptions(form: Form) {
  let options = optionsByForm.get(form);
  if (!options) {
    options = { external: form.options };
    optionsByForm.set(form, options);
  }
  return options;
}

function applyOptions(form: Form) {
  const { autoForm, external } = getOptions(form);
  const options = autoForm
    ? {
        ...external,
        validators: {
          ...autoForm.validators,
          ...external.validators,
        },
        validationLogic: external.validationLogic ?? autoForm.validationLogic,
        defaultValues: autoForm.defaultValues,
        onSubmit: autoForm.onSubmit,
        onSubmitInvalid: external.onSubmitInvalid ?? autoForm.onSubmitInvalid,
      }
    : external;

  form.update(options);
  form.options = options;
}
export const useAppForm = ((options: any) => {
  const form = useBaseAppForm(options);
  getOptions(form).external = options ?? {};
  useIsomorphicLayoutEffect(() => applyOptions(form));

  return form;
}) as unknown as typeof useBaseAppForm;

export function useExternalFormOptions(
  form: Form | undefined,
  options: Options,
): void {
  useIsomorphicLayoutEffect(() => {
    if (!form) return;

    const state = getOptions(form);
    state.autoForm = options;
    applyOptions(form);

    return () => {
      if (state.autoForm !== options) return;
      delete state.autoForm;
      applyOptions(form);
    };
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
