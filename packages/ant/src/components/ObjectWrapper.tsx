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
  // Collapse
  // const items: CollapseProps["items"] = React.useMemo(
  //   () => [
  //     {
  //       key: field.key,
  //       label,
  //       children,
  //     },
  //   ],
  //   [field.key]
  // );
  return (
    <section>
      <ObjectProvider
        control={fieldController}
        label={field.key}
        getValues={getObjectValue}
      >
        <Form.Item
          label={<Typography.Title level={4}>{label}</Typography.Title>}
          labelCol={{
            span: 24,
            style: { fontWeight: "600" },
          }}
        >
          {children}
          {/* <Collapse items={items} /> */}
        </Form.Item>
      </ObjectProvider>
    </section>
  );
};
