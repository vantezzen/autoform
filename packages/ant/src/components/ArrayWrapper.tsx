import { PlusOutlined } from "@ant-design/icons";
import { ArrayWrapperProps } from "@autoform/react";
import { Button, Typography, Form } from "antd";
import React from "react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
}) => {
  console.log(field);
  return (
    <section style={{ marginBottom: "20px" }}>
      <Typography.Text>{label}</Typography.Text>
      <Form.List name={field.key}>
        {(shema, { add }) => {
          return (
            <>
              {shema.map(() => children)}
              <Button
                onClick={() => {
                  add();
                  onAddItem();
                }}
                data-testid="add-item-button"
              >
                <PlusOutlined size={14} />
              </Button>
            </>
          );
        }}
      </Form.List>
    </section>
  );
};
