import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@acp-autoform/react";
import React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  useField,
  inputProps,
  error,
  id,
}) => {
  const formField = useField();
  return (
    <Input
      id={id}
      type="number"
      className={error ? "border-destructive" : ""}
      {...inputProps}
      {...formField}
    />
  );
};
