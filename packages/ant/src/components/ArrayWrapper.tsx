import { PlusOutlined } from "@ant-design/icons";
import { ArrayWrapperProps } from "@autoform/react";
import { Button, Typography } from "antd";
import React from "react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  children,
  onAddItem,
}) => {
  return (
    <section style={{ marginBottom: "20px" }}>
      <Typography.Paragraph style={{ marginRight: "5px" }}>
        {label}
      </Typography.Paragraph>
      {children}
      <Button onClick={onAddItem} data-testid="add-item-button">
        <PlusOutlined size={14} />
      </Button>
    </section>
  );
};
