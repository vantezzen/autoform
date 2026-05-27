import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  useField,
  inputProps,
  error,
  id,
}) => {
  const formField = useField();
  const { value, ...rest } = formField;

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
