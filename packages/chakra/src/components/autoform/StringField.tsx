import React from "react";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import { Input } from "@chakra-ui/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { field } = useField({ name: id });

  return (
    <Input
      key={id}
      id={id}
      {...inputProps}
      {...field}
      value={field.value ?? ""}
    />
  );
};
