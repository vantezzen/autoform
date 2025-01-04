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
          style={{ width: "100%" }}
          {...field}
          disabled={
            path.length > 1 ? controls?.control?.disabled : field.disabled
          }
          {...inputProps}
          key={inputProps.key}
          onChange={(e) => {
            onChange({
              path,
              event: e.target.value,
              field,
              setValue,
              controls,
              type: "input",
            });
            // if inputProps?.onChange is a function, call it
            if (typeof inputProps?.onChange === "function") {
              inputProps?.onChange?.(e);
            }
          }}
          onBlur={(e) => {
            inputProps?.onBlur?.(e);
            field.onBlur();
          }}
        />
      )}
    />
  );
};
