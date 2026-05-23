import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";
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
