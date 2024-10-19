import React from "react";
import { DateInput } from "@mantine/dates";
import { AutoFormFieldProps } from "@autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
}) => (
  <DateInput label={label} description={field.description} {...inputProps} />
);
