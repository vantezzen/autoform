import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import React from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
  parsedField,
}) => {
  const { field } = useField({ name: id });
  const { value, onChange, ...formFieldRest } = field;

  return (
    <Select
      onValueChange={onChange}
      value={value}
      {...inputProps}
      {...formFieldRest}
    >
      <SelectTrigger
        id={id}
        {...field}
        className={error ? "border-destructive" : ""}
      >
        <SelectValue
          placeholder={inputProps?.placeholder ?? "Select an option"}
        />
      </SelectTrigger>
      <SelectContent>
        {(parsedField.options || []).map(([key, label], index) => (
          <SelectItem key={`${key}-${index}`} value={label}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
