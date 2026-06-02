import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps } from "@acp-autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
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
      {...inputProps}
      {...formFieldProps}
      value={formFieldProps.value ?? ""}
      inputRef={ref}
    />
  );
};
