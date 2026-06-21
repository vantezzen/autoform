import {
  createFormHook,
  createFormHookContexts,
  useIsomorphicLayoutEffect,
} from "@tanstack/react-form";
import {
  coordinateExternalFormOptions,
  reapplyCoordinatedFormOptions,
} from "./external-form-options";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

const { useAppForm: useBaseAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {},
  formComponents: {},
});

export const useAppForm = ((options: any) => {
  const form = useBaseAppForm(options);
  coordinateExternalFormOptions(form, options);
  // useForm reapplies its options in an earlier layout effect on every render.
  useIsomorphicLayoutEffect(() => {
    reapplyCoordinatedFormOptions(form);
  });

  return form;
}) as unknown as typeof useBaseAppForm;
