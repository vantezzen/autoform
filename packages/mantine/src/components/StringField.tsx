import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  error,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });

  return (
    <TextInput
      id={id}
      key={id}
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
