import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import { InputNumber } from "antd";
import React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { ref, ...field } = useField({ name: id }).field;

  return (
    <InputNumber
      ref={ref}
      id={id}
      key={id}
      {...inputProps}
      {...field}
      style={{ width: "100%" }}
    />
  );
};
