import React from "react";
import { getLabel, ParsedField } from "@acp-autoform/core";

import { useAutoForm } from "./context";
import { createField } from "./utils";
import { useFieldError } from "./useFieldError";
import { ArrayField } from "./ArrayField";
import { ObjectField } from "./ObjectField";
import { AutoFormFieldProps } from "./types";

export const AutoFormField: React.FC<{
  field: ParsedField;
  path: string[];
}> = ({ field, path }) => {
  const { formComponents, uiComponents } = useAutoForm();
  const error = useFieldError(path);

  const fullPath = path.join(".");
  const fieldConfig = field.fieldConfig;
  const FieldWrapper = fieldConfig?.fieldWrapper || uiComponents.FieldWrapper;

  let FieldComponent: React.ComponentType<AutoFormFieldProps>;
  if (field.type === "array") {
    FieldComponent = ArrayField;
  } else if (field.type === "object") {
    FieldComponent = ObjectField;
  } else if (field.type in formComponents) {
    FieldComponent = formComponents[field.type as keyof typeof formComponents]!;
  } else if ("fallback" in formComponents) {
    FieldComponent = formComponents.fallback;
  } else {
    FieldComponent = () => (
      <uiComponents.ErrorMessage
        error={`[AutoForm Configuration Error] No component found for type "${field.type}" nor a fallback`}
      />
    );
  }

  return (
    <FieldWrapper
      label={getLabel(field)}
      error={error}
      id={fullPath}
      field={field}
    >
      <FieldComponent
        key={`${fullPath}-input`}
        path={path}
        id={fullPath}
        error={error}
        field={field}
        label={getLabel(field)}
        useField={createField(fullPath)}
        inputProps={fieldConfig?.inputProps}
      />
    </FieldWrapper>
  );
};
