import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import { Select } from "antd";
import React from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  parsedField,
}) => {
  const { ref, ...field } = useField({ name: id }).field;

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
      {...inputProps}
      {...field}
      options={options}
      style={{ width: "100%" }}
    />
  );
};
