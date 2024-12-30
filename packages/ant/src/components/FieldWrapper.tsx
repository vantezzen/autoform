import { FieldWrapperProps } from "@autoform/react";
import { Form, Typography } from "antd";
import React from "react";

const DISABLED_LABELS = ["boolean", "object", "array"];
export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  field,
  path,
}) => {
  // if the field is nested, we need to wrap it in a Form.Item
  if (field.type === "array" || field.type === "object") {
    return children;
  }
  return (
    <Form.Item
      key={field.key}
      name={path.length === 1 ? field.key : path.at(-1)}
      label={!DISABLED_LABELS.includes(field.type) ? label : ""}
      required={field.required}
      extra={field.fieldConfig?.description}
      validateStatus={error ? "error" : undefined}
    >
      <div>
        {children}
        {/* antd-design's error message */}
        {field.schema?.length ? null : (
          <Typography.Text type="danger">{error}</Typography.Text>
        )}
      </div>
    </Form.Item>
  );
};
