import React from "react";
import { Checkbox } from "@mantine/core";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useField } from "../field-context";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  error,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });
  return (
    <Checkbox
      key={id}
      {...field}
      {...inputProps}
      error={error}
      checked={field.value ?? false}
      description={parsedField.fieldConfig?.description}
      label={
        <span style={{ lineHeight: "16px", cursor: "pointer" }}>
          {label}
          {parsedField.required && (
            <span style={{ color: "red", opacity: 0.8 }}> * </span>
          )}
        </span>
      }
    />
  );
};
