import { DeleteOutlined } from "@ant-design/icons";
import { ArrayElementWrapperProps } from "@autoform/react";
import { Button, Col } from "antd";
import React from "react";

export const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
}) => {
  return (
    <Col
      span={24}
      style={{
        position: "relative",
        marginTop: "2px",
        padding: "2px",
        border: "1px solid #ccc",
        borderRadius: "1px",
      }}
    >
      <Button
        onClick={() => {
          onRemove?.();
        }}
        style={{
          position: "absolute",
          cursor: "pointer",
          top: "8%",
          right: "8%",
        }}
      >
        <DeleteOutlined />
      </Button>
      {children}
    </Col>
  );
};
