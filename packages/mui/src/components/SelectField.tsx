import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  error,
}) => (
  <Select error={!!error} fullWidth {...inputProps}>
    {(field.options || []).map(([key, label]) => (
      <MenuItem key={key} value={label}>
        {label}
      </MenuItem>
    ))}
  </Select>
);
