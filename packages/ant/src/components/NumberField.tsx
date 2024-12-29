import { AutoFormFieldProps } from "@autoform/react";
import { InputNumber } from "antd";
import { Controller } from "react-hook-form";
import React from "react";
export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  control,
}) => (
  <Controller
    name={field.key}
    control={control}
    defaultValue={field.default}
    render={({ field: fields }) => {
      return <InputNumber style={{ width: "100%" }} {...fields} />;
    }}
  />
);
