import { Input } from "@/components/ui/input";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useFieldContext } from "@acp-autoform/react/tanstack-form";
import React from "react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const field = useFieldContext<string>();

  return (
    <Input
      id={id}
      type="date"
      className={error ? "border-destructive" : ""}
      value={field.state.value ?? ""}
      onChange={(e) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      name={String(field.name).replace(/\[(\d+)\]/g, ".$1")}
      {...inputProps}
    />
  );
};
