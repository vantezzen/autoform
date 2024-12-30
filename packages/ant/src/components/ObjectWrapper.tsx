import { ObjectWrapperProps } from "@autoform/react";
import { Form, Typography } from "antd";
import React from "react";
import { useController } from "react-hook-form";
import ObjectProvider from "../Context/Object";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  children,
  label,
  field,
  getObjectValue,
  control,
}) => {
  const { field: fieldController } = useController({
    name: field.key,
    control,
    defaultValue: getObjectValue(field.key),
  });
  return (
    <section style={{ marginBottom: "20px" }}>
      <ObjectProvider
        control={fieldController}
        label={field.key}
        getValues={getObjectValue}
      >
        <Form.Item
          label={<Typography.Title level={4}>{label}</Typography.Title>}
          labelCol={{ span: 24 }}
        >
          {children}
        </Form.Item>
      </ObjectProvider>
    </section>
  );
};
