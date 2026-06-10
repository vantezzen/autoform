import React, { useEffect, useContext } from "react";
import { ErrorMapContext } from "./AutoForm";
import { useField, type ReactFormExtendedApi } from "@tanstack/react-form";
import { getLabel } from "@acp-autoform/core";
import type { ParsedField } from "@acp-autoform/core";
import { useAutoForm } from "../context";
import { getFieldError } from "./getFieldError";
import { ArrayField } from "./ArrayField";
import { ObjectField } from "./ObjectField";
import { formatTanStackPath } from "./utils";
import type { AutoFormFieldProps } from "../types";
import { fieldContext } from "./AutoForm";
export const AutoFormField: React.FC<{
  parsedField: ParsedField;
  path: string[];
  form: ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any, any, any>;
}> = ({ path, parsedField, form }) => {
  const { formComponents, uiComponents } = useAutoForm();
  const fullPath = formatTanStackPath(path);
  const fieldConfig = parsedField.fieldConfig;
  const FieldWrapper = fieldConfig?.fieldWrapper || uiComponents.FieldWrapper;

  let FieldComponent: React.ComponentType<AutoFormFieldProps>;
  if (parsedField.type === "array") {
    FieldComponent = ArrayField as any;
  } else if (parsedField.type === "object") {
    FieldComponent = ObjectField as any;
  } else if (parsedField.type in formComponents) {
    FieldComponent = formComponents[parsedField.type as keyof typeof formComponents]!;
  } else if ("fallback" in formComponents) {
    FieldComponent = formComponents.fallback;
  } else {
    FieldComponent = () => (
      <uiComponents.ErrorMessage
        error={`[AutoForm Configuration Error] No component found for type "${parsedField.type}" nor a fallback`}
      />
    );
  }

  const errorMap = useContext(ErrorMapContext);
  
  const fieldApi = useField({ form, name: fullPath as any, mode: parsedField.type === "array" ? "array" : undefined });
  const error = getFieldError(fieldApi, errorMap);

  return (
    <fieldContext.Provider value={fieldApi as any}>
      <FieldWrapper
        label={getLabel(parsedField)}
        error={error}
        id={fullPath}
        parsedField={parsedField}
      >
        <FieldComponent
          key={`${fullPath}-input`}
          path={path}
          id={fullPath}
          error={error}
          parsedField={parsedField}
          label={getLabel(parsedField)}
          inputProps={{
            ...fieldConfig?.inputProps,
            "aria-invalid": !!error || undefined,
          }}
          {...{ form }}
        />
      </FieldWrapper>
    </fieldContext.Provider>
  );
};
