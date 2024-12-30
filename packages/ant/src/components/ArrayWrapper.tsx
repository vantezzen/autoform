import { PlusOutlined } from "@ant-design/icons";
import { ArrayWrapperProps } from "@autoform/react";
import { Button, Form, Row, Typography } from "antd";
import React from "react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
}) => {
  return (
    <section style={{ marginBottom: "20px" }}>
      <Typography.Text>{label}</Typography.Text>
      <Form.Item label={field.key}>
        <Row>
          {children}
          <Button
            onClick={() => {
              // add();
              onAddItem();
            }}
            data-testid="add-item-button"
          >
            <PlusOutlined size={14} />
          </Button>
        </Row>
      </Form.Item>
    </section>
  );
};
