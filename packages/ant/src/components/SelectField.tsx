import { AutoFormFieldProps } from "@autoform/react";
import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  error,
  control,
}) => {
  const options =
    field.options?.map((option) => ({
      label: option[1],
      value: option[0],
    })) || [];
  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.default}
      render={({ field }) => {
        return (
          <Select style={{ width: "100%" }} {...field} options={options} />
        );
      }}
    />
  );
};
