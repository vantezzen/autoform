import React from "react";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useField } from "../field-context";
import { Checkbox, FormControlLabel } from "@mui/material";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  error,
  inputProps,
  parsedField,
}) => {
  const { ref, ...field } = useField({ name: id }).field;

  return (
    <FormControlLabel
      key={id}
      {...inputProps}
      label={
        <span style={{ color: error && "#d32f2f", opacity: 0.8 }}>
          {label} {parsedField.required && " *"}
        </span>
      }
      control={
        <Checkbox
          slotProps={{ input: { ref } }}
          {...field}
          checked={field.value || false}
        />
      }
    />
  );
};
