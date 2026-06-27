import { Input } from "@/components/ui/input";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useController } from "react-hook-form";
import React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { field } = useController({ name: id });
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
