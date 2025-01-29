import React from "react";
import { FieldWrapperProps } from "@autoform/react";
import { Stack } from "@chakra-ui/react";

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
    <Stack gap="2">
      {!isDisabled && (
        <label htmlFor={id}>
          {label}
          {field.required && <span className="text-destructive"> *</span>}
        </label>
      )}
      {children}
      {field.fieldConfig?.description && <p>{field.fieldConfig.description}</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </Stack>
  );
};
