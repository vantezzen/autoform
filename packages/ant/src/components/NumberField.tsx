import { AutoFormFieldProps } from "@autoform/react";
import { InputNumber } from "antd";
import React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const formField = useField();

  return (
    <InputNumber
      id={id}
      key={id}
      {...inputProps}
      {...formField}
      style={{ width: "100%" }}
    />
  );
};
