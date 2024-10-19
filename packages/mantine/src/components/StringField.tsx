import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
  id,
}) => {
  return (
    <TextInput
      id={id}
      label={label}
      description={field.description}
      {...inputProps}
    />
  );
};
