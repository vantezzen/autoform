import { Input } from "@/components/ui/input";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useFieldContext } from "@dual-autoform/react/tanstack-form";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const field = useFieldContext<string>();

  return (
    <Input
      id={id}
      className={error ? "border-destructive" : ""}
      value={field.state.value ?? ""}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      name={field.name}
      {...inputProps}
    />
  );
};
