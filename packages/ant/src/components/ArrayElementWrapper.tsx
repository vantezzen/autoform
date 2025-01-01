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
        marginTop: "20px",
        marginBottom: "20px",
        padding: "0 10px 5px 10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
      }}
    >
      <Button
        onClick={() => {
          onRemove?.();
        }}
      >
        <DeleteOutlined />
      </Button>
      <div>{children}</div>
    </Col>
  );
};
