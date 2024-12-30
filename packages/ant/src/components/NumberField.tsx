import { AutoFormFieldProps } from "@autoform/react";
import { InputNumber } from "antd";
import { Controller } from "react-hook-form";
import React from "react";
import { useObjectContext } from "../Context/Object";
export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  control,
  path,
}) => {
  const controls = useObjectContext();
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
              // if not children Items
              if (path.length === 1) return fields.onChange(e);
              // if children Items
              controls?.control?.onChange({
                ...controls.getValues(controls?.label),
                [fields.name]: e,
              });
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
