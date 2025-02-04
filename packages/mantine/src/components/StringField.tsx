import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
  id,
}) => {
  const { key, ...props } = inputProps;

  return (
    <TextInput
      id={id}
      key={key}
      label={label}
      description={field.fieldConfig?.description}
      {...props}
    />
  );
};
