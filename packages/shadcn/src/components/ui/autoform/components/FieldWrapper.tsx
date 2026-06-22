import React from "react";
import { Label } from "@/components/ui/label";
import type { FieldWrapperProps } from "@acp-autoform/react";

const DISABLED_LABELS = ["boolean", "object", "array"];
const DISABLE_HELPER_TEXT = ["object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  id,
  label,
  error,
  children,
  parsedField,
}) => {
  const isDisabled = DISABLED_LABELS.includes(parsedField.type);
  const hideHelperText = DISABLE_HELPER_TEXT.includes(parsedField.type);

  return (
    <div className="flex flex-col gap-2">
      {!isDisabled && (
        <Label htmlFor={id}>
          {label}
          {parsedField.required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      {children}
      {!hideHelperText && parsedField.fieldConfig?.description && (
        <div className="text-sm text-muted-foreground">
          {parsedField.fieldConfig.description}
        </div>
      )}
      {!hideHelperText && error && (
        <div className="text-sm text-destructive">{error}</div>
      )}
    </div>
  );
};
