import { AutoFormFieldProps } from "@autoform/react";
import { Select } from "antd";
import React from "react";
import { useController } from "react-hook-form";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  const options =
    field.options?.map((option) => ({
      label: option[1],
      value: option[1],
    })) || [];
  return (
    <Select
      id={id}
      key={key}
      {...props}
      {...formField}
      options={options}
      onChange={formField.onChange}
      style={{ width: "100%" }}
    />
  );
};
