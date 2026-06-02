import React from "react";
import { Checkbox } from "@mantine/core";
import { AutoFormFieldProps } from "@acp-autoform/react";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  useField,
  inputProps,
}) => {
  const formField = useField();
  return (
    <Checkbox
      key={id}
      {...formField}
      {...inputProps}
      error={error}
      checked={formField.value ?? false}
      description={field.fieldConfig?.description}
      label={
        <span style={{ lineHeight: "16px", cursor: "pointer" }}>
          {label}
          {field.required && (
            <span style={{ color: "red", opacity: 0.8 }}> * </span>
          )}
        </span>
      }
    />
  );
};
