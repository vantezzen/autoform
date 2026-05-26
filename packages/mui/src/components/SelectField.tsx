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
  const { ref, ...formFieldProps } = useField();
  return (
    <Select
      key={id}
      fullWidth
      {...inputProps}
      {...formFieldProps}
      value={formFieldProps.value ?? ""}
      inputRef={ref}
      labelId={id}
      label={label}
    >
      {(field.options || []).map(([key, optionLabel], index) => (
        <MenuItem key={`${id}-${index}`} value={optionLabel}>
          {optionLabel}
        </MenuItem>
      ))}
    </Select>
  );
};
