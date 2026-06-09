import React from "react";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
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
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });

  const options = createListCollection({
    items:
      parsedField.options?.map((option) => ({
        label: option[1],
        value: option[1],
      })) || [],
  });

  return (
    <SelectRoot
      key={id}
      {...inputProps}
      name={field.name}
      value={[field.value]}
      onValueChange={({ value }) => field.onChange(value[0])}
      onInteractOutside={() => field.onBlur()}
      onBlur={field.onBlur}
      collection={options}
    >
      <SelectTrigger ref={field.ref}>
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
