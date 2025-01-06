import { FieldWrapperProps } from "@autoform/react";
import { Form, Typography } from "antd";
import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

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
      colon={false}
      name={path.length === 1 ? field.key : path.at(-1)}
      label={!DISABLED_LABELS.includes(field.type) ? label : ""}
      required={field.required}
      extra={field.fieldConfig?.description}
      validateStatus={error ? "error" : undefined}
      labelCol={{
        style: { fontWeight: "600" },
      }}
      style={{
        paddingBottom: field.fieldConfig?.description ? "50px" : "30px",
        marginBottom: field.type === "select" ? "45px" : "20px",
      }}
      layout="vertical"
    >
      <div>
        {children}
        {/* antd-design's error message */}
        {field.schema?.length || !error ? null : (
          <div style={{ color: "red", height: "20px" }}>
            <CloseCircleOutlined className="site-result-demo-error-icon" />
            <Typography.Text type="danger" style={{ marginTop: "10px" }}>
              {error}
            </Typography.Text>
          </div>
        )}
      </div>
    </Form.Item>
  );
};
