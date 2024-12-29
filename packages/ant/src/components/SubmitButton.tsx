import { Button } from "antd";
import { Form } from "antd";
import React from "react";

export const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Form.Item label={null}>
    <Button type="primary" htmlType="submit">
      {children}
    </Button>
  </Form.Item>
);
