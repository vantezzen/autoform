import React from "react";
import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => (
  <Input
    id={id}
    type="number"
    className={error ? "border-destructive" : ""}
    {...inputProps}
  />
);
