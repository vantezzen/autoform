import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Typography } from "antd";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => {
  if (!error) return null;
  return (
    <Typography.Text type="danger" style={{ marginTop: "10px" }}>
      <CloseCircleOutlined
        style={{ marginRight: 8 }}
        className="site-result-demo-error-icon"
      />
      {error}
    </Typography.Text>
  );
};
