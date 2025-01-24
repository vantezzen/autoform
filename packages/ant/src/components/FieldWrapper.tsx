import React from "react";
import { Form, Typography } from "antd";
import { FieldWrapperProps } from "@autoform/react";
import { CloseCircleOutlined } from "@ant-design/icons";

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
      name={id}
      htmlFor={id}
      colon={false}
      label={label}
      key={field.key}
      required={field.required}
      extra={field.fieldConfig?.description}
      validateStatus={error ? "error" : undefined}
      labelCol={{
        style: { fontWeight: "600" },
      }}
      style={{
        paddingBottom: field.fieldConfig?.description ? "50px" : "30px",
        marginBottom: field.type === "select" ? "35px" : "20px",
      }}
      layout="vertical"
    >
      {children}
      {/* antd-design's error message */}
      {error && (
        <div style={{ color: "red", height: "20px" }}>
          <CloseCircleOutlined className="site-result-demo-error-icon" />
          <Typography.Text
            type="danger"
            style={{ margin: "5px", marginTop: "10px" }}
          >
            {error}
          </Typography.Text>
        </div>
      )}
    </Form.Item>
  );
};
