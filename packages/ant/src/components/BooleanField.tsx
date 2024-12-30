import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "antd";
import { Controller } from "react-hook-form";
import { useObjectContext } from "../Context/Object";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  // label,
  // inputProps,
  control,
  path,
  field,
}) => {
  const controls = useObjectContext();
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
            onChange={() => {
              if (path.length === 1) fields.onChange(!fields.value);
              else
                controls?.control?.onChange({
                  ...controls.getValues(controls?.label),
                  [fields.name]: !fields.value,
                });
            }}
            disabled={
              path.length > 1 ? controls?.control?.disabled || true : false
            }
          >
            <span style={{ lineHeight: "16px" }}>{field.key}</span>
          </Checkbox>
        );
      }}
    />
  );
};
