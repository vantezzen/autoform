import React from "react";
import TextField from "@mui/material/TextField";
import { AutoFormFieldProps } from "@autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  label,
}) => (
  <TextField
    type="date"
    error={!!error}
    fullWidth
    label={label}
    InputLabelProps={{ shrink: true }}
    {...inputProps}
  />
);
