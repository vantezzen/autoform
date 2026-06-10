import React from "react";
import { Form, Typography } from "antd";
import { FieldWrapperProps } from "@acp-autoform/react";

const DISABLED_LABELS = ["boolean", "object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  id,
  parsedField,
}) => {
  const isDisabled = DISABLED_LABELS.includes(parsedField.type);

  return (
    <div style={{ display: "contents" }}>
      {isDisabled ? (
        children
      ) : (
        <Form.Item
          htmlFor={id}
          colon={false}
          label={label}
          key={parsedField.key}
          hasFeedback
          required={parsedField.required}
          extra={parsedField.fieldConfig?.description}
          validateStatus={error ? "error" : undefined}
          labelCol={{
            style: { fontWeight: "600" },
          }}
          style={{
            paddingBottom: parsedField.fieldConfig?.description ? "50px" : "30px",
            marginBottom: parsedField.type === "select" ? "30px" : "25px",
          }}
          layout="vertical"
        >
          <Form.Item noStyle name={id}>
            {children}
          </Form.Item>

          {error && (
            <Typography.Text
              type="danger"
              style={{ marginBottom: "10px", marginTop: "10px" }}
            >
              {error}
            </Typography.Text>
          )}
        </Form.Item>
      )}
    </div>
  );
};
