import React from "react";
import { Input } from "@/components/ui/input";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => (
  <Input
    id={id}
    className={error ? "border-destructive" : ""}
    {...inputProps}
  />
);
