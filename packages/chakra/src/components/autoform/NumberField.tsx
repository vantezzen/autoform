import React from "react";
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@autoform/react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field } = useController({ name: id });

  return (
    <NumberInputRoot
      key={key}
      disabled={field.disabled}
      name={field.name}
      value={field.value}
      onValueChange={({ value }) => {
        field.onChange(value);
      }}
      {...props}
    >
      <NumberInputField onBlur={field.onBlur} />
    </NumberInputRoot>
  );
};
