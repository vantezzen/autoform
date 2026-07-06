import React from "react";
import Input from "@mui/material/Input";
import type { AutoFormFieldProps } from "@autoform/react";
import { useField } from "../field-context";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { ref, ...formFieldProps } = useField({ name: id }).field;
  return (
    <Input
      id={id}
      key={id}
      fullWidth
      type="number"
      {...inputProps}
      {...formFieldProps}
      inputRef={ref}
    />
  );
};
