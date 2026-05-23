import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutoFormFieldProps } from "@autoform/react";
import React from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  useField,
  inputProps,
  error,
  id,
}) => {
  const formField = useField();
  const { value, onChange, ...formFieldRest } = formField;

  return (
    <Select
      onValueChange={onChange}
      value={value}
      {...inputProps}
      {...formFieldRest}
    >
      <SelectTrigger
        id={id}
        {...formField}
        className={error ? "border-destructive" : ""}
      >
        <SelectValue
          placeholder={inputProps.placeholder ?? "Select an option"}
        />
      </SelectTrigger>
      <SelectContent>
        {(field.options || []).map(([key, label]) => (
          <SelectItem key={id} value={label}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
