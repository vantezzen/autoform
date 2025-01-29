import React from "react";
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@autoform/react";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  const options = createListCollection({
    items:
      field.options?.map((option) => ({
        label: option[0],
        value: option[1],
      })) || [],
  });

  return (
    <SelectRoot
      key={key}
      name={formField.name}
      value={[formField.value]}
      onValueChange={({ value }) => formField.onChange(value[0])}
      onInteractOutside={() => formField.onBlur()}
      collection={options}
      {...props}
    >
      <SelectTrigger>
        <SelectValueText placeholder={props.placeholder ?? "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        {options.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
