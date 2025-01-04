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
          required={inputProps?.required}
          key={field?.name}
          onChange={(e) => {
            onChange({
              path,
              event: e.target.value,
              field,
              setValue,
              controls,
              type: "input",
            });
            // if not children, call inputProps?.onChange
            if (path.length > 1) {
              inputProps?.onChange?.(e);
            }
          }}
          onBlur={(e) => {
            if (path.length > 1) {
              inputProps?.onBlur?.(e);
            }
            field.onBlur();
          }}
        />
      )}
    />
  );
};
