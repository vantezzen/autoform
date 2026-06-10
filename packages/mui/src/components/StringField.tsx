import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  error,
}) => {
  const { ref, ...field } = useField({ name: id }).field;
  return (
    <Input
      id={id}
      key={id}
      fullWidth
      inputRef={ref}
      {...inputProps}
      {...field}
      value={field.value ?? ""}
    />
  );
};
