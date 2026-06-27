import React from "react";
import { Select } from "@mantine/core";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useField } from "../field-context";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  error,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });

  return (
    <Select
      key={id}
      {...inputProps}
      {...field}
      label={label}
      error={error}
      withAsterisk={parsedField.required}
      description={parsedField.fieldConfig?.description}
      data={(parsedField.options || []).map(([_key, label]) => ({
        value: label,
        label,
      }))}
    />
  );
};
