import { useEffect } from "react";
import type { UseFieldFn } from "../types";
import { useFieldContext } from "./form-context";

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
