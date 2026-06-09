import React from "react";
import { Checkbox } from "@mantine/core";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";

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
