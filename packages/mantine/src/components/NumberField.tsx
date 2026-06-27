import React from "react";
import { TextInput } from "@mantine/core";
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useField } from "../field-context";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  error,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });

  return (
    <TextInput
      key={id}
      type="number"
      label={label}
      error={error}
      {...field}
      {...inputProps}
      value={field.value ?? ""}
      withAsterisk={parsedField.required}
      description={parsedField.fieldConfig?.description}
    />
  );
};
