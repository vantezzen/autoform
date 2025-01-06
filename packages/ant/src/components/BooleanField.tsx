import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { useObjectContext } from "../Context/Object";
import { onChange } from "../utils";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  // label,
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
          <>
            <Checkbox
              {...fields}
              checked={fields.value}
              key={fields.name}
              {...inputProps}
              required={inputProps?.required}
              onChange={(e) => {
                onChange({
                  path,
                  event: e.target.checked,
                  field: fields,
                  setValue,
                  controls,
                  type: "boolean",
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
                fields.onBlur();
              }}
            >
              <span style={{ lineHeight: "16px" }}>
                {field.description || field.key}
              </span>
            </Checkbox>
          </>
        );
      }}
    />
  );
};
