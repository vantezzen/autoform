import { ArrayWrapperProps } from "@autoform/react";
import { Button, Form, Typography } from "antd";
import React from "react";
import { useController } from "react-hook-form";
import ObjectProvider from "../Context/Object";
import { PlusOutlined } from "@ant-design/icons";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  getArrayValue,
  control,
  onAddItem,
}) => {
  const { field: fieldController } = useController({
    name: field.key,
    control,
    defaultValue: getArrayValue(field.key),
  });
  return (
    <section style={{ marginBottom: "20px" }}>
      <ObjectProvider
        control={fieldController}
        label={field.key}
        getValues={getArrayValue}
      >
        {/* <Form.Item
        labelCol={{
          style: { fontWeight: "600" },
        }}
      > */}
        <Typography.Title level={4}>{label}</Typography.Title>
        {children}
        {/* </Form.Item> */}
        <section>
          <Button
            type="primary"
            onClick={() => {
              onAddItem();
            }}
          >
            <PlusOutlined />
          </Button>
        </section>
      </ObjectProvider>
    </section>
  );
};
