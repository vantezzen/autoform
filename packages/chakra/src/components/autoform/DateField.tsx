import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "@chakra-ui/react";

export const DateField: React.FC<AutoFormFieldProps> = ({ id, inputProps }) => {
  const { key, ...props } = inputProps;

  return <Input type="date" {...props} />;
};
