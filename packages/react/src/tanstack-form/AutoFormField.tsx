import React from "react";
import { getLabel } from "@acp-autoform/core";
import type { ParsedField } from "@acp-autoform/core";
import type { AutoFormFieldProps } from "../types";
import { useAutoForm } from "../context";
import { ArrayField } from "./ArrayField";
import { ObjectField } from "./ObjectField";
import { useFormContext } from "./form-context";
import { formatTanStackPath, getErrorMessage } from "./utils";

export const AutoFormField: React.FC<{
  parsedField: ParsedField;
  path: string[];
}> = ({ path, parsedField }) => {
  const { formComponents, uiComponents } = useAutoForm();
  const form = useFormContext() as any;

  const domPath = path.join(".");
  const fullPath = formatTanStackPath(path);
  const fieldConfig = parsedField.fieldConfig;
  const FieldWrapper = fieldConfig?.fieldWrapper || uiComponents.FieldWrapper;
  const fieldProps = {
    name: fullPath as any,
    mode: parsedField.type === "array" ? "array" : undefined,
  };

  let FieldComponent: React.ComponentType<AutoFormFieldProps>;
  if (parsedField.type === "array") {
    FieldComponent = ArrayField;
  } else if (parsedField.type === "object") {
    FieldComponent = ObjectField;
  } else if (parsedField.type in formComponents) {
    FieldComponent = formComponents[parsedField.type]!;
  } else if ("fallback" in formComponents) {
    FieldComponent = formComponents.fallback;
  } else {
    FieldComponent = () => (
      <uiComponents.ErrorMessage
        error={`[AutoForm Configuration Error] No component found for type "${parsedField.type}" nor a fallback`}
      />
    );
  }

  const AppField = form.AppField as React.ComponentType<any>;
  return (
    <AppField {...fieldProps}>
      {(fieldApi: any) => {
        const error = getErrorMessage(fieldApi);

        return (
          <FieldWrapper
            label={getLabel(parsedField)}
            error={error}
            id={domPath}
            parsedField={parsedField}
          >
            <FieldComponent
              key={`${domPath}-input`}
              path={path}
              id={domPath}
              error={error}
              parsedField={parsedField}
              label={getLabel(parsedField)}
              inputProps={{
                ...fieldConfig?.inputProps,
                "aria-invalid": !!error || undefined,
              }}
            />
          </FieldWrapper>
        );
      }}
    </AppField>
  );
};
