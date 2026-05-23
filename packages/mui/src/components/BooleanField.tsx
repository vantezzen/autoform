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
  const formField = useField();

  return (
    <FormControlLabel
      key={id}
      {...inputProps}
      {...formField}
      {...formField}
      label={
        <span style={{ color: error && "#d32f2f", opacity: 0.8 }}>
          {label} {field.required && " *"}
        </span>
      }
      checked={formField.value}
      control={<Checkbox />}
    />
  );
};
