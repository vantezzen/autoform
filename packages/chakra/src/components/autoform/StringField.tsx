import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "@chakra-ui/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  inputProps,
}) => {
  const { key, ...props } = inputProps;

  return <Input key={key} {...props} />;
};
