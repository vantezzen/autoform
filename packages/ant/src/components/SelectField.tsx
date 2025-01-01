import { AutoFormFieldProps } from "@autoform/react";
import { Select, Typography } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useObjectContext } from "../Context/Object";
import { onChange } from "../utils";
export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  // error,
  control,
  path,
  inputProps,
}) => {
  const controls = useObjectContext();
  const { setValue } = useFormContext();
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
              disabled={
                path.length > 1 ? controls?.control?.disabled : field.disabled
              }
              options={options}
              {...inputProps}
              onChange={(e) => {
                onChange(path, e, field, setValue, controls);
                // if inputProps?.onChange is a function, call it
                if (typeof inputProps?.onChange === "function") {
                  inputProps?.onChange?.(e);
                }
              }}
            />
          );
        }}
      />
      <Typography.Text type="secondary">{field.description}</Typography.Text>
    </div>
  );
};
