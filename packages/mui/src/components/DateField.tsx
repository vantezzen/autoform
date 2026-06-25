import React from "react";
import TextField from "@mui/material/TextField";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useField } from "../field-context";

export const DateField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  error,
  label,
}) => {
  const { ref, ...formFieldProps } = useField({ name: id }).field;
  const { value, ...restProps } = formFieldProps;

  const formattedValue = value instanceof Date
    ? value.toISOString().split("T")[0]
    : typeof value === "string" && !isNaN(Date.parse(value))
      ? new Date(value).toISOString().split("T")[0]
      : value ?? "";

  return (
    <TextField
      key={id}
      type="date"
      error={!!error}
      fullWidth
      label={label}
      slotProps={{ inputLabel: { shrink: true } }}
      {...inputProps}
      {...restProps}
      value={formattedValue}
      inputRef={ref}
    />
  );
};
