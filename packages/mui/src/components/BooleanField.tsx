import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  useField,
  inputProps,
}) => {
  const { ref, ...formFieldProps } = useField();

  return (
    <FormControlLabel
      key={id}
      {...inputProps}
      label={
        <span style={{ color: error && "#d32f2f", opacity: 0.8 }}>
          {label} {field.required && " *"}
        </span>
      }
      control={
        <Checkbox
          slotProps={{ input: { ref } }}
          {...formFieldProps}
          checked={formFieldProps.value || false}
        />
      }
    />
  );
};
