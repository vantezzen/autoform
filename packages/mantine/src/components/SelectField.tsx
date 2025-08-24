import React from "react";
import { Select } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  error,
  inputProps,
  label,
  id,
  value,
}) => {
  const { key, ...props } = inputProps;

  return (
    <Select
      key={key}
      {...props}
      label={label}
      error={error}
      onChange={(value) => {
        const event = {
          target: {
            name: field.key,
            value: value,
          },
        };
        props.onChange(event);
      }}
      defaultValue={value}
      description={field.fieldConfig?.description}
      data={(field.options || []).map(([key, label]) => ({
        value: label,
        label,
      }))}
    />
  );
};
