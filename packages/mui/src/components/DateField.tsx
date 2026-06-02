import React from "react";
import TextField from "@mui/material/TextField";
import { AutoFormFieldProps } from "@acp-autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
  error,
  label,
}) => {
  const { ref, ...formFieldProps } = useField();
  return (
    <TextField
      key={id}
      type="date"
      error={!!error}
      fullWidth
      label={label}
      slotProps={{ inputLabel: { shrink: true } }}
      {...inputProps}
      {...formFieldProps}
      inputRef={ref}
    />
  );
};
