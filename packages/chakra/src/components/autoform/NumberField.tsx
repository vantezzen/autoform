import React from "react";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { ref, ...field } = useField({ name: id }).field;

  return (
    <NumberInputRoot
      key={id}
      onValueChange={({ value }) => {
        field.onChange(value);
      }}
      value={field.value ?? ""}
      w={"full"}
    >
      <NumberInputField id={id} {...inputProps} {...field} ref={ref} />
    </NumberInputRoot>
  );
};
