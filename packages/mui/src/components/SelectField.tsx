import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  label,
  useField,
  inputProps,
}) => {
  const formField = useField();
  return (
    <Select
      key={id}
      fullWidth
      {...inputProps}
      {...formField}
      labelId={id}
      label={label}
    >
      {(field.options || []).map(([key, label]) => (
        <MenuItem key={id} value={label}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
