import React from "react";
import { Form, Typography } from "antd";
import { FieldWrapperProps } from "@acp-autoform/react";

const DISABLED_LABELS = ["boolean", "object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  field,
  id,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  if (isDisabled) {
    return <>{children}</>;
  }

  else return (
      <Form.Item
        htmlFor={id}
        colon={false}
        label={label}
        key={field.key}
        hasFeedback
        required={field.required}
        extra={field.fieldConfig?.description}
        validateStatus={error ? "error" : undefined}
        labelCol={{
          style: { fontWeight: "600" },
        }}
        style={{
          paddingBottom: field.fieldConfig?.description ? "50px" : "30px",
          marginBottom: field.type === "select" ? "30px" : "25px",
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
    );
};
