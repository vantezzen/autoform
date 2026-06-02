import React from "react";
import { DateInput } from "@mantine/dates";
import { AutoFormFieldProps } from "@acp-autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  useField,
  inputProps,
}) => {
  const formField = useField();
  return (
    <DateInput
      key={id}
      {...inputProps}
      {...formField}
      label={label}
      error={error}
      withAsterisk={field.required}
      description={field.fieldConfig?.description}
      value={formField.value ? new Date(formField.value) : undefined}
      onChange={(value) =>
        formField.onChange(value?.toLocaleDateString("en-CA"))
      }
    />
  );
};
