import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps } from "@acp-autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
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
      id={id}
      key={id}
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
