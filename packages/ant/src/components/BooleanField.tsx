import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "antd";
import { useController } from "react-hook-form";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  field,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });
  return (
    <Checkbox
      id={id}
      key={formField.name}
      {...props}
      {...formField}
      checked={formField.value}
      onChange={(e) => {
        formField.onChange(e.target.checked);
      }}
    >
      <span style={{ lineHeight: "16px" }}>
        {field.description || field.key}
      </span>
    </Checkbox>
  );
};
