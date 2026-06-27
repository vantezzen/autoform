import React from "react";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useField } from "../../field-context";
import { Input } from "@chakra-ui/react";

export const DateField: React.FC<AutoFormFieldProps> = ({ id, inputProps }) => {
  const { field } = useField({ name: id });
  const { value, ...restField } = field;

  const formattedValue = value instanceof Date
    ? value.toISOString().split("T")[0]
    : typeof value === "string" && !isNaN(Date.parse(value))
      ? new Date(value).toISOString().split("T")[0]
      : value ?? "";

  return (
    <Input
      id={id}
      type="date"
      {...inputProps}
      {...restField}
      value={formattedValue}
    />
  );
};
