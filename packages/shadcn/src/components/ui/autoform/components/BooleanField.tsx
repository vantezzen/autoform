import React from "react";
import { AutoFormFieldProps, useField } from "@acp-autoform/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  inputProps,
  parsedField,
}) => {
  const { field } = useField({ name: id });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      (
        document.querySelector('button[type="submit"]') as HTMLButtonElement
      )?.click();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        {...inputProps}
        {...field}
        checked={field.value}
        onCheckedChange={field.onChange}
        onKeyDown={handleKeyDown}
      />
      <Label htmlFor={id}>
        {label}
        {parsedField.required && <span className="text-destructive"> *</span>}
      </Label>
    </div>
  );
};
