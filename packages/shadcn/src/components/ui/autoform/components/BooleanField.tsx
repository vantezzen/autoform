import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  label,
  useField,
  inputProps,
}) => {
  const formField = useField();

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
        {...formField}
        checked={formField.value}
        onCheckedChange={formField.onChange}
        onKeyDown={handleKeyDown}
      />
      <Label htmlFor={id}>
        {label}
        {field.required && <span className="text-destructive"> *</span>}
      </Label>
    </div>
  );
};
