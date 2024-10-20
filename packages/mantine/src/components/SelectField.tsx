import React from "react";
import { Select } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  error,
  inputProps,
  label,
}) => (
  <Select
    error={error}
    label={label}
    data={(field.options || []).map(([key, label]) => ({ value: key, label }))}
    description={field.description}
    {...inputProps}
  />
);
