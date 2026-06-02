import React from "react";
import { Field } from "../ui/field";
import { FieldWrapperProps } from "@acp-autoform/react";

const DISABLED_LABELS = ["boolean", "object", "array"];
const DISABLE_HELPER_TEXT = ["object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  id,
  label,
  error,
  field,
  children,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);
  const hideHelperText = DISABLE_HELPER_TEXT.includes(field.type);

  return (
    <Field
      label={
        !isDisabled && (
          <label htmlFor={id}>
            {label}
            {field.required && (
              <span style={{ color: "red", opacity: 0.8 }}> *</span>
            )}
          </label>
        )
      }
      helperText={!hideHelperText ? field.fieldConfig?.description : undefined}
      errorText={!isDisabled ? error : undefined}
      marginY={!isDisabled ? 6 : undefined}
    >
      {children}
    </Field>
  );
};
