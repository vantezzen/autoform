import { AutoFormFieldProps } from "@autoform/react";
import { Select, Typography } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { useObjectContext } from "../Context/Object";
export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  // error,
  control,
  path,
}) => {
  const controls = useObjectContext();
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
            <Select
              style={{ width: "100%" }}
              {...field}
              options={options}
              onChange={(e) => {
                // if not children Items
                if (path.length === 1) return field.onChange(e);
                // if children Items
                controls?.control?.onChange({
                  ...controls.getValues(controls?.label),
                  [field.name]: e.target.value,
                });
              }}
              disabled={
                path.length > 1 ? controls?.control?.disabled : field.disabled
              }
            />
          );
        }}
      />
      <Typography.Text type="secondary">{field.description}</Typography.Text>
    </div>
  );
};
