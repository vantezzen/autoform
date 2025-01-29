import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { useController } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <Checkbox
      id={id}
      key={key}
      {...props}
      {...formField}
      checked={formField.value}
      onCheckedChange={({ checked }) => formField.onChange(checked)}
      style={{ display: "flex", marginTop: "15px", marginBottom: "5px" }}
    >
      <label htmlFor={id} style={{ lineHeight: "16px", cursor: "pointer" }}>
        {label}
        {field.required && <span style={{ color: "red" }}> *</span>}
        {error}
      </label>
    </Checkbox>
  );
};
