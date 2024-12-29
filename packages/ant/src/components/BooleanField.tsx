import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  // label,
  inputProps,
  control,
}) => (
  <Controller
    control={control}
    name={inputProps.name}
    render={({ field }) => <Checkbox {...field} checked={field.value} />}
  />
);
