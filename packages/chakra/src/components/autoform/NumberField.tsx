import React from "react";
import { AutoFormFieldProps } from "@acp-autoform/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  useField,
  inputProps,
}) => {
  const { ref, ...formField } = useField();

  return (
    <NumberInputRoot
      key={id}
      onValueChange={({ value }) => {
        formField.onChange(value);
      }}
      value={formField.value ?? ""}
      w={"full"}
    >
      <NumberInputField id={id} {...inputProps} {...formField} ref={ref} />
    </NumberInputRoot>
  );
};
