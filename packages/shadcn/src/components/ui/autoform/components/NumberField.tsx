import { Input } from "@/components/ui/input";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { field } = useField({ name: id });
  return (
    <Input
      id={id}
      type="number"
      className={error ? "border-destructive" : ""}
      {...inputProps}
      {...field}
    />
  );
};
