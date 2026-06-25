import React from "react";
import Input from "@mui/material/Input";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useField } from "../field-context";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
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
