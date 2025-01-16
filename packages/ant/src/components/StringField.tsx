import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "antd";
import React from "react";
import { useController } from "react-hook-form";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <Input
      id={id}
      key={key}
      {...props}
      {...formField}
      style={{ width: "100%" }}
      onChange={formField.onChange}
    />
  );
};
