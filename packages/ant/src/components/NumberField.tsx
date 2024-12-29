import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "antd";
import React from "react";
export const NumberField: React.FC<AutoFormFieldProps> = ({
  error,
  inputProps,
}) => (
  <Input
    type="number"
    error={!!error}
    style={{ width: "100%" }}
    {...inputProps}
  />
);
