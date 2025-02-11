import { Button } from "antd";
import { Form } from "antd";
import React from "react";

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Form.Item>
    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
      {children}
    </Button>
  </Form.Item>
);
