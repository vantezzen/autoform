import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
export const StringField: React.FC<AutoFormFieldProps> = ({
  // error,
  // id,
  field,
  control,
  inputProps,
}) => {
  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.default}
      render={({ field }) => <Input key={inputProps.key} {...field} />}
    />
  );
};
