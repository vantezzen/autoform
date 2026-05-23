import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "../ui/checkbox";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  useField,
  inputProps,
}) => {
  const formField = useField();

  return (
    <Checkbox
      id={id}
      key={id}
      {...inputProps}
      {...formField}
      {...formField}
      invalid={!!error}
      checked={formField.value}
      onCheckedChange={({ checked }) => formField.onChange(checked)}
      style={{ display: "flex", marginTop: "15px", marginBottom: "2px" }}
    >
      <span style={{ lineHeight: "16px", cursor: "pointer" }}>
        {label}
        {field.required && (
          <span style={{ color: "red", opacity: 0.8 }}> *</span>
        )}
        <br />
        {error && (
          <span style={{ color: "red", opacity: 0.8, fontSize: "12.2px" }}>
            {error}
          </span>
        )}
      </span>
    </Checkbox>
  );
};
