import { Input } from "@/components/ui/input";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import React from "react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { field } = useField({ name: id });
  return (
    <Input
      id={id}
      type="date"
      className={error ? "border-destructive" : ""}
      {...inputProps}
      {...field}
    />
  );
};
