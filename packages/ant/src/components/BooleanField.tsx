import React from "react";
import { AutoFormFieldProps } from "@acp-autoform/react";
import { Checkbox, Typography } from "antd";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  useField,
  inputProps,
}) => {
  const { ref, ...formField } = useField();

  return (
    <>
      <Checkbox
        ref={ref}
        id={id}
        key={id}
        {...inputProps}
        {...formField}
        checked={formField.value}
        onChange={(e) => {
          formField.onChange(e.target.checked);
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
          {field.required && (
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
      {field.fieldConfig?.description && (
        <Typography.Text
          type="secondary"
          style={{ marginTop: "10px", fontWeight: "normal" }}
        >
          {field.fieldConfig?.description}
        </Typography.Text>
      )}
    </>
  );
};
