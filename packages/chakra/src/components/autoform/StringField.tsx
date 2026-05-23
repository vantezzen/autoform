import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "@chakra-ui/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const formField = useField();
  return <Input id={id} key={id} {...inputProps} {...formField} />;
};
