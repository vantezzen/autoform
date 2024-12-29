import React from "react";

import { FieldWrapperProps } from "@autoform/react";
import { Form } from "antd";

const DISABLED_LABELS = ["boolean", "date", "object", "array"];
export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  id,
  field,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <Form.Item
      key={id}
      label={label}
      required={field.required}
      extra={field.fieldConfig?.description}
      validateStatus={error ? "error" : undefined}
    >
      <div>
        {children}
        <span style={{ color: "red" }}>{error}</span>
      </div>
    </Form.Item>
  );
};
