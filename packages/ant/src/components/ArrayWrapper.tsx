import { ArrayWrapperProps } from "@autoform/react";
import { Button, Typography } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  error,
  children,
  onAddItem,
  inputProps,
}) => {
  const { key, ref, ...props } = inputProps;

  return (
    <section style={{ marginBottom: "20px" }}>
      <Typography.Title
        level={5}
        ref={ref}
        tabIndex={-1}
        aria-describedby={`${key}-error ${key}-description `}
      >
        {field.required && (
          <Typography.Text
            type="danger"
            style={{
              marginTop: "10px",
              fontSize: "19px",
            }}
          >
            *{" "}
          </Typography.Text>
        )}
        {label}
      </Typography.Title>
      {error && (
        <div
          style={{ marginBottom: "10px", marginTop: "-10px" }}
          id={key + "-error"}
        >
          <Typography.Text type="danger">{error}</Typography.Text>
        </div>
      )}
      {field.fieldConfig?.description && (
        <div
          style={{ marginTop: "-10px", marginBottom: "5px" }}
          id={key + "-description"}
        >
          <Typography.Text type="secondary" style={{ fontWeight: "normal" }}>
            {field.fieldConfig?.description}
          </Typography.Text>
        </div>
      )}
      {children}
      <Button
        aria-label={`add ${label}`}
        {...props}
        type="primary"
        onClick={onAddItem}
      >
        <PlusOutlined />
      </Button>
    </section>
  );
};
