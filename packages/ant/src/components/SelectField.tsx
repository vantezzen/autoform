import { AutoFormFieldProps } from "@acp-autoform/react";
import { Select } from "antd";
import React from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  useField,
  inputProps,
}) => {
  const { ref, ...formField } = useField();

  const options =
    field.options?.map((option) => ({
      label: option[1],
      value: option[1],
    })) || [];
  return (
    <Select
      ref={ref}
      id={id}
      key={id}
      {...inputProps}
      {...formField}
      options={options}
      style={{ width: "100%" }}
    />
  );
};
