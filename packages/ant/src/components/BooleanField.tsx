import React from "react";
import type { AutoFormFieldProps } from "@autoform/react";
import { useField } from "../field-context";
import { Checkbox, Typography } from "antd";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  error,
  inputProps,
  parsedField,
}) => {
  const { ref, ...field } = useField({ name: id }).field;

  return (
    <>
      <Checkbox
        ref={ref}
        id={id}
        key={id}
        {...inputProps}
        {...field}
        checked={field.value}
        onChange={(e) => {
          field.onChange(e.target.checked);
        }}
        style={{
          display: "flex",
          marginTop: "15px",
          marginBottom: "5px",
        }}
      >
        <label
          htmlFor={id}
          style={{
            lineHeight: "17px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          {parsedField.required && (
            <span style={{ color: "red", fontSize: "19px", opacity: "0.75" }}>
              {" "}
              *{" "}
            </span>
          )}
          {label}
        </label>
      </Checkbox>
      {error && (
        <>
          <Typography.Text
            type="danger"
            style={{ marginTop: "10px", fontWeight: "normal" }}
          >
            {error}
          </Typography.Text>
          <br />
        </>
      )}
      {parsedField.fieldConfig?.description && (
        <Typography.Text
          type="secondary"
          style={{ marginTop: "10px", fontWeight: "normal" }}
        >
          {parsedField.fieldConfig?.description}
        </Typography.Text>
      )}
    </>
  );
};
