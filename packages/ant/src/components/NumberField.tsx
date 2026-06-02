import { AutoFormFieldProps } from "@acp-autoform/react";
import { InputNumber } from "antd";
import React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const { ref, ...formField } = useField();

  return (
    <InputNumber
      ref={ref}
      id={id}
      key={id}
      {...inputProps}
      {...formField}
      style={{ width: "100%" }}
    />
  );
};
