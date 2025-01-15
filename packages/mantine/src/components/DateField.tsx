import React from "react";
import { DateInput } from "@mantine/dates";
import { AutoFormFieldProps } from "@autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  field,
  inputProps,
  label,
}) => {
  const { key, ...props } = inputProps;

  return (
    <DateInput
      key={key}
      {...props}
      label={label}
      description={field.fieldConfig?.description}
      error={inputProps.error}
      onChange={(value) => {
        // react-hook-form expects an event object
        const event = {
          target: {
            name: field.key,
            value: value?.toISOString(),
          },
        };
        inputProps.onChange(event);
      }}
      value={inputProps.value}
    />
  );
};
