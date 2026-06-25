import React from "react";
import type { AutoFormFieldProps } from "@acp-autoform/react";
import { useFieldContext } from "@acp-autoform/react/tanstack-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  inputProps,
  parsedField,
}) => {
  const field = useFieldContext<boolean>();

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
        name={field.name}
        {...inputProps}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(!!checked)}
        onBlur={field.handleBlur}
        onKeyDown={handleKeyDown}
      />
      <Label htmlFor={id}>
        {label}
        {parsedField.required && <span className="text-destructive"> *</span>}
      </Label>
    </div>
  );
};
