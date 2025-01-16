import { ObjectWrapperProps } from "@autoform/react";
import { Form, Typography } from "antd";
import React from "react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <Form.Item
      label={<Typography.Title level={4}>{label}</Typography.Title>}
      labelCol={{
        span: 24,
        style: { fontWeight: "600" },
      }}
    >
      {children}
    </Form.Item>
  );
};
