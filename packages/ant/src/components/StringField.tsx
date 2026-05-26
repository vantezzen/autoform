import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "antd";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const { ref, ...formField } = useField();

  return (
    <Input
      ref={ref}
      id={id}
      key={id}
      {...inputProps}
      {...formField}
      value={formField.value ?? ""}
      style={{ width: "100%" }}
    />
  );
};
