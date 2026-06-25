import React from "react";
import { DateInput } from "@mantine/dates";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useField } from "../field-context";

export const DateField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  error,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });
  return (
    <DateInput
      key={id}
      {...inputProps}
      {...field}
      label={label}
      error={error}
      withAsterisk={parsedField.required}
      description={parsedField.fieldConfig?.description}
      value={field.value ? new Date(field.value) : undefined}
      onChange={(value) => field.onChange(value?.toLocaleDateString("en-CA"))}
    />
  );
};
