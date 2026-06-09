import { ObjectWrapperProps } from "@acp-autoform/react";
import { Typography } from "antd";
import React from "react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
  parsedField,
}) => {
  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <Typography.Title
          level={5}
          style={{ marginTop: "40px", marginBottom: "0px" }}
        >
          {label}
        </Typography.Title>
        {parsedField.fieldConfig?.description && (
          <Typography.Text
            type="secondary"
            style={{
              fontWeight: "normal",
              marginTop: "-10px",
            }}
          >
            {parsedField.fieldConfig?.description}
          </Typography.Text>
        )}
      </div>
      {children}
    </div>
  );
};
