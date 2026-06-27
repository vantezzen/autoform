import { Input } from "@/components/ui/input";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useController } from "react-hook-form";
import React from "react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { field } = useController({ name: id });
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
      className={error ? "border-destructive" : ""}
      {...inputProps}
      {...restField}
      value={formattedValue}
    />
  );
};
