import { ArrayWrapperProps } from "@autoform/react";
import { Button, Typography } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  children,
  onAddItem,
}) => {
  return (
    <section style={{ marginBottom: "20px" }}>
      <Typography.Title level={4}>{label}</Typography.Title>
      {children}
      <section>
        <Button
          type="primary"
          onClick={() => {
            onAddItem();
          }}
        >
          <PlusOutlined />
        </Button>
      </section>
    </section>
  );
};
