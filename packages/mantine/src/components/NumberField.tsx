import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps } from "@acp-autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  useField,
  inputProps,
}) => {
  const formField = useField();

  return (
    <TextInput
      key={id}
      type="number"
      label={label}
      error={error}
      {...formField}
      {...inputProps}
      value={formField.value ?? ""}
      withAsterisk={field.required}
      description={field.fieldConfig?.description}
    />
  );
};
