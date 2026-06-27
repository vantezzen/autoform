import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useField } from "../field-context";
import { Select } from "antd";
import React from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });
  const { ref, ...restInputProps } = inputProps as any;

  const options =
    parsedField.options?.map((option) => ({
      label: option[1],
      value: option[1],
    })) || [];
  return (
    <Select
      ref={ref}
      id={id}
      key={id}
      {...restInputProps}
      {...field}
      options={options}
      style={{ width: "100%" }}
    />
  );
};
