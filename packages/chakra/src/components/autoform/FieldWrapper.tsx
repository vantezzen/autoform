import React from "react";
import { Field } from "../ui/field";
import { FieldWrapperProps } from "@autoform/react";

const DISABLED_LABELS = ["boolean", "object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  field,
  id,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <Field
      label={
        !isDisabled && (
          <label htmlFor={id}>
            {label}
            {field.required && <span className="text-destructive"> *</span>}
          </label>
        )
      }
      helperText={field.fieldConfig?.description}
      errorText={error}
      marginBottom={6}
      marginTop={6}
    >
      {children}
    </Field>
  );
};
