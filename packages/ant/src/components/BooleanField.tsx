import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { useObjectContext } from "../Context/Object";
import { onChange } from "../utils";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  // label,
  // inputProps,
  control,
  path,
  inputProps,
  field,
}) => {
  const controls = useObjectContext();
  const { setValue } = useFormContext();
  return (
    <Controller
      control={control}
      name={field.key}
      render={({ field: fields }) => {
        return (
          <Checkbox
            {...fields}
            checked={fields.value}
            key={fields.name}
            disabled={
              path.length > 1 ? controls?.control?.disabled || true : false
            }
            {...inputProps}
            onChange={(e) => {
              onChange(path, e.target.value, fields, setValue, controls);
              // if inputProps?.onChange is a function, call it
              if (typeof inputProps?.onChange === "function") {
                inputProps?.onChange?.(e);
              }
            }}
          >
            <span style={{ lineHeight: "16px" }}>{field.key}</span>
          </Checkbox>
        );
      }}
    />
  );
};
