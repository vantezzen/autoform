import React from "react";
import { getLabel, ParsedField } from "@acp-autoform/core";
import { useAutoForm } from "../context";
import { useFieldError } from "./useFieldError";
import { ArrayField } from "./ArrayField";
import { ObjectField } from "./ObjectField";
import { AutoFormFieldProps } from "../types";

export const AutoFormField: React.FC<{
  parsedField: ParsedField;
  path: string[];
}> = ({ path, parsedField }) => {
  const { formComponents, uiComponents } = useAutoForm();
  const error = useFieldError(path);

  const fullPath = path.join(".");
  const fieldConfig = parsedField.fieldConfig;
  const FieldWrapper = fieldConfig?.fieldWrapper || uiComponents.FieldWrapper;

  let FieldComponent: React.ComponentType<AutoFormFieldProps>;
  if (parsedField.type === "array") {
    FieldComponent = ArrayField;
  } else if (parsedField.type === "object") {
    FieldComponent = ObjectField;
  } else if (parsedField.type in formComponents) {
    FieldComponent =
      formComponents[parsedField.type as keyof typeof formComponents]!;
  } else if ("fallback" in formComponents) {
    FieldComponent = formComponents.fallback;
  } else {
    FieldComponent = () => (
      <uiComponents.ErrorMessage
        error={`[AutoForm Configuration Error] No component found for type "${parsedField.type}" nor a fallback`}
      />
    );
  }

  return (
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
      />
    </FieldWrapper>
  );
};
