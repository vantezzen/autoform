import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Typography } from "antd";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => {
  if (!error) return null;
  return (
    <div style={{ color: "red", height: "20px" }}>
      <CloseCircleOutlined className="site-result-demo-error-icon" />
      <Typography.Text type="danger" style={{ marginTop: "10px" }}>
        {error}
      </Typography.Text>
    </div>
  );
};
