import { Input } from "@/components/ui/input";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { field } = useField({ name: id });
  const { value, ...rest } = field;

  return (
    <Input
      id={id}
      className={error ? "border-destructive" : ""}
      value={value ?? ""}
      {...inputProps}
      {...rest}
    />
  );
};
