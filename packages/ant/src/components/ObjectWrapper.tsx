import React from "react";
import { ObjectWrapperProps } from "@autoform/react";
import { Row, Typography } from "antd";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <Row>
      <Typography.Title level={4}>{label}</Typography.Title>
      {children}
    </Row>
  );
};
