import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useController } from "react-hook-form";
import React from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
  parsedField,
}) => {
  const { field } = useController({ name: id });
  const { value, onChange, onBlur, name } = field;
  const { ref, "aria-invalid": ariaInvalid, ...restInputProps } = inputProps as any;

  return (
    <Select
      onValueChange={onChange}
      value={value}
      name={name}
      {...restInputProps}
    >
      <SelectTrigger
        id={id}
        ref={ref}
        aria-invalid={ariaInvalid}
        onBlur={onBlur}
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
