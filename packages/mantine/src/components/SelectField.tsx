import React from "react";
import { Select } from "@mantine/core";
import { AutoFormFieldProps } from "@acp-autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  useField,
  inputProps,
}) => {
  const formField = useField();

  return (
    <Select
      key={id}
      {...inputProps}
      {...formField}
      label={label}
      error={error}
      withAsterisk={field.required}
      description={field.fieldConfig?.description}
      data={(field.options || []).map(([_key, label]) => ({
        value: label,
        label,
      }))}
    />
  );
};
