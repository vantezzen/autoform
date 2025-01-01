import { AutoFormFieldProps } from "@autoform/react";
import { InputNumber } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { useObjectContext } from "../Context/Object";
import { onChange } from "../utils";
export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  control,
  path,
}) => {
  const controls = useObjectContext();
  const { setValue } = useFormContext();
  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.default}
      render={({ field: fields }) => {
        return (
          <InputNumber
            style={{ width: "100%" }}
            {...fields}
            onChange={(e) => {
              onChange(path, e, fields, setValue, controls);
            }}
            disabled={
              path.length > 1 ? controls?.control?.disabled : field.required
            }
          />
        );
      }}
    />
  );
};
