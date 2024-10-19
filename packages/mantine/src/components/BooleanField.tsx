import React from "react";
import { Checkbox } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  label,
}) => <Checkbox label={label} {...inputProps} />;
