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
        padding: "20px 10px 0 10px",
        border: "1px solid #ddd",
        borderRadius: "7px",
      }}
    >
      <Button onClick={onRemove}>
        <DeleteOutlined />
      </Button>
      {children}
    </Col>
  );
};
