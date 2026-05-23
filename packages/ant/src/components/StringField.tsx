import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "antd";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const formField = useField();

  return (
    <Input
      id={id}
      key={id}
      {...inputProps}
      {...formField}
      value={formField.value ?? ""}
      style={{ width: "100%" }}
    />
  );
};
