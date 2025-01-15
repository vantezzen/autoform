import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
}) => {
  const { key, ...props } = inputProps;

  return (
    <TextInput
      key={key}
      type="number"
      label={label}
      description={field.fieldConfig?.description}
      {...props}
    />
  );
};
