import React from "react";
import { NumberInput } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
}) => (
  <NumberInput label={label} description={field.description} {...inputProps} />
);
