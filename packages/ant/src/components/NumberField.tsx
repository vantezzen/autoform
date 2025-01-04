import { AutoFormFieldProps } from "@autoform/react";
import { InputNumber } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import { useObjectContext } from "../Context/Object";
import { onChange } from "../utils";
export const NumberField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
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
            // number can't be use with inputProps
            // {...inputProps}
            required={inputProps?.required}
            key={inputProps.key}
            onChange={(e) => {
              onChange({
                path,
                event: e,
                field: fields,
                setValue,
                controls,
                type: "input",
              });
              // if inputProps?.onChange is a function, call it
              if (typeof inputProps?.onChange === "function") {
                inputProps?.onChange?.({ target: { value: e } });
              }
            }}
            onBlur={(e) => {
              inputProps?.onBlur?.({ target: { value: e } });
              fields.onBlur();
            }}
          />
        );
      }}
    />
  );
};
