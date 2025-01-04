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
              {...inputProps}
              key={field.name}
              options={options}
              onChange={(e) => {
                field.onChange(e);
                onChange({
                  path,
                  event: e,
                  field,
                  setValue,
                  controls,
                  type: "select",
                });
                inputProps?.onChange?.({ target: { value: e } });
              }}
              onBlur={(e) => {
                inputProps?.onBlur?.({ target: { value: e } });
                field.onBlur();
              }}
            />
          );
        }}
      />
      <Typography.Text type="secondary">{field.description}</Typography.Text>
    </div>
  );
};
