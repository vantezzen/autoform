import { AutoFormFieldProps } from "@autoform/react";
import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  // error,
  control,
}) => {
  const options =
    field.options?.map((option) => ({
      label: option[0],
      value: option[1],
    })) || [];
  return (
    <div>
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
    </div>
  );
};
