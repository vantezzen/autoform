import React from "react";
import { Field } from "../ui/field";
import { FieldWrapperProps } from "@autoform/react";

const DISABLED_LABELS = ["boolean", "object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  field,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <Field
      label={
        !isDisabled && (
          <span>
            {label}
            {field.required && <span style={{color:"red", opacity:0.8}}> *</span>}
          </span>
        )
      }
      helperText={field.fieldConfig?.description}
      errorText={error}
      marginY={!isDisabled ? 6: undefined}
    >
      {children}
    </Field>
  );
};
