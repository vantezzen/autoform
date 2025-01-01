import { ArrayWrapperProps } from "@autoform/react";
import { Button, Form, Input } from "antd";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useObjectContext } from "../Context/Object";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
}) => {
  const controls = useObjectContext();
  const { setValue } = useFormContext();
  return (
    <section style={{ marginBottom: "20px" }}>
      {/* {fields.map((field) => children)} */}
      <Form.List
        name={field.key}
        initialValue={field.schema?.map((item) => item.key)}
      >
        {(fields, { add }) =>
          fields.map((field) => (
            <Form.Item {...field}>
              {children}
              <Button
                onClick={() => {
                  onAddItem();
                  add();
                }}
              >
                add
              </Button>
            </Form.Item>
          ))
        }
      </Form.List>
    </section>
  );
};
