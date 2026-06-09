import React from "react";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import { Checkbox } from "../ui/checkbox";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  error,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });

  return (
    <Checkbox
      id={id}
      key={id}
      {...inputProps}
      {...field}
      invalid={!!error}
      checked={field.value}
      onCheckedChange={({ checked }) => field.onChange(checked)}
      style={{ display: "flex", marginTop: "15px", marginBottom: "2px" }}
    >
      <span style={{ lineHeight: "16px", cursor: "pointer" }}>
        {label}
        {parsedField.required && (
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
