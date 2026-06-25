import { Input } from "@/components/ui/input";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useController } from "react-hook-form";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { field } = useController({ name: id });
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
