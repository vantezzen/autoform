import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import { Input } from "antd";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { ref, ...field } = useField({ name: id }).field;

  return (
    <Input
      ref={ref}
      id={id}
      key={id}
      {...inputProps}
      {...field}
      value={field.value ?? ""}
      style={{ width: "100%" }}
    />
  );
};
