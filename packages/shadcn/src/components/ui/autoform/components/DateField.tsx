import { Input } from "@/components/ui/input";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import React from "react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  useField,
  inputProps,
  error,
  id,
}) => {
  const formField = useField();
  return (
    <Input
      id={id}
      type="date"
      className={error ? "border-destructive" : ""}
      {...inputProps}
      {...formField}
    />
  );
};
