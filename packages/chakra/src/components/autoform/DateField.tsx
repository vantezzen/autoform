import React from "react";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useField } from "../../field-context";
import { Input } from "@chakra-ui/react";

export const DateField: React.FC<AutoFormFieldProps> = ({ id, inputProps }) => {
  const { field } = useField({ name: id });

  return (
    <Input
      id={id}
      type="date"
      {...inputProps}
      {...field}
      value={field.value ?? ""}
    />
  );
};
