import { AutoFormFieldProps } from "@autoform/react";
import { InputNumber } from "antd";
import { useController } from "react-hook-form";
import React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <InputNumber
      id={id}
      key={key}
      {...props}
      {...formField}
      style={{ width: "100%" }}
      onChange={formField.onChange}
    />
  );
};
