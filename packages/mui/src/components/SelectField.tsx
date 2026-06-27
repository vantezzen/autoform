import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useField } from "../field-context";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });
  const { ref, ...restInputProps } = inputProps as any;
  return (
    <Select
      key={id}
      fullWidth
      {...restInputProps}
      {...field}
      value={field.value ?? ""}
      inputRef={ref}
      labelId={id}
      label={label}
    >
      {(parsedField.options || []).map(([_key, optionLabel], index) => (
        <MenuItem key={`${id}-${index}`} value={optionLabel}>
          {optionLabel}
        </MenuItem>
      ))}
    </Select>
  );
};
