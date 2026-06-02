import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps } from "@acp-autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const { ref, ...formFieldProps } = useField();
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
