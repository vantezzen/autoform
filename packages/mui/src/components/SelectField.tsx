import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  inputProps,
  parsedField,
}) => {
  const { ref, ...field } = useField({ name: id }).field;
  return (
    <Select
      key={id}
      fullWidth
      {...inputProps}
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
