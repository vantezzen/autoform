import React from "react";
import { AutoFormFieldProps } from "@acp-autoform/react";
import { Input } from "@chakra-ui/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const formField = useField();

  return (
    <Input
      key={id}
      id={id}
      {...inputProps}
      {...formField}
      value={formField.value ?? ""}
    />
  );
};
