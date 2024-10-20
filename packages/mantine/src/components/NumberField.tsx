import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
}) => (
  <TextInput
    type="number"
    label={label}
    description={field.description}
    {...inputProps}
  />
);
