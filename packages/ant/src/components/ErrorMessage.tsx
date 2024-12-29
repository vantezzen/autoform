import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";

export const ErrorMessage: React.FC<{ error: string }> = ({ error }) => {
  return (
    <p style={{ color: "red" }}>
      <CloseCircleOutlined className="site-result-demo-error-icon" />
      <span style={{ marginLeft: 4, color: "red" }}>{error}</span>
    </p>
  );
};
