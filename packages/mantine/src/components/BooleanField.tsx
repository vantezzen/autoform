import React from "react";
import { Checkbox } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  label,
}) => {
  const { key, ...props } = inputProps;

  return <Checkbox label={label} key={key} {...props} />;
};
