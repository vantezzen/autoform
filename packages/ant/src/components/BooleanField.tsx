import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  // label,
  inputProps,
  control,
  field,
}) => {
  console.log({ field, inputProps });
  return (
    <Controller
      control={control}
      name={field.key}
      render={({ field: fields }) => {
        return (
          <Checkbox {...fields} checked={fields.value} key={fields.name}>
            <span style={{ lineHeight: "16px" }}>{field.key}</span>
          </Checkbox>
        );
      }}
    />
  );
};
