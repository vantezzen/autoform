import React from "react";
import { FieldWrapperProps } from "@autoform/react";
import { Form, Typography } from "antd";

// const DISABLED_LABELS = ["boolean", "date", "object", "array"];
export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  // id,
  field,
  path,
}) => {
  if (field.type === "object" && field.schema?.length)
    return (
      <Form.List key={field.key} name={path}>
        {() => [<section>{children}</section>]}
      </Form.List>
    );
  return (
    <Form.Item
      key={field.key}
      name={field.key}
      label={label}
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
