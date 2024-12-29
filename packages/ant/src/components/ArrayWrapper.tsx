import React from "react";
import { Typography, Button, Row } from "antd";
import { ArrayWrapperProps } from "@autoform/react";
import { PlusOutlined } from "@ant-design/icons";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  children,
  onAddItem,
}) => {
  return (
    <Row>
      <Typography.Title level={5}>{label}</Typography.Title>
      {children}
      <Button onClick={onAddItem} variant="outlined" style={{ marginTop: 1 }}>
        <PlusOutlined />
      </Button>
    </Row>
  );
};
