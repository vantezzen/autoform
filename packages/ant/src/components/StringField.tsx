import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useObjectContext } from "../Context/Object";
import { onChange } from "../utils";
export const StringField: React.FC<AutoFormFieldProps> = ({
  // error,
  // id,
  field,
  control,
  inputProps,
  path,
}) => {
  const controls = useObjectContext();
  const { setValue } = useFormContext();
  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.default}
      render={({ field }) => (
        <Input
          key={inputProps.key}
          style={{ width: "100%" }}
          {...field}
          disabled={
            path.length > 1 ? controls?.control?.disabled : field.disabled
          }
          {...inputProps}
          onChange={(e) => {
            onChange(path, e.target.value, field, setValue, controls);
            // if inputProps?.onChange is a function, call it
            if (typeof inputProps?.onChange === "function") {
              inputProps?.onChange?.(e);
            }
          }}
        />
      )}
    />
  );
};
