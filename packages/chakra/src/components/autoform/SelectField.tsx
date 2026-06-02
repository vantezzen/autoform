import React from "react";
import { AutoFormFieldProps } from "@acp-autoform/react";
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
  useField,
  inputProps,
}) => {
  const formField = useField();

  const options = createListCollection({
    items:
      field.options?.map((option) => ({
        label: option[1],
        value: option[1],
      })) || [],
  });

  return (
    <SelectRoot
      key={id}
      {...inputProps}
      name={formField.name}
      value={[formField.value]}
      onValueChange={({ value }) => formField.onChange(value[0])}
      onInteractOutside={() => formField.onBlur()}
      onBlur={formField.onBlur}
      collection={options}
    >
      <SelectTrigger ref={formField.ref}>
        <SelectValueText
          placeholder={inputProps?.placeholder ?? "Select an option"}
        />
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
