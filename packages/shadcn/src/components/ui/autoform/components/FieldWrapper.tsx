import React from "react";
import { Label } from "@/components/ui/label";
import { FieldWrapperProps } from "@acp-autoform/react";

const DISABLED_LABELS = ["boolean", "object", "array"];
const DISABLE_HELPER_TEXT = ["object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  id,
  label,
  field,
  error,
  children,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);
  const hideHelperText = DISABLE_HELPER_TEXT.includes(field.type);

  return (
    <div className="flex flex-col gap-2">
      {!isDisabled && (
        <Label htmlFor={id}>
          {label}
          {field.required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      {children}
      {!hideHelperText && field.fieldConfig?.description && (
        <p className="text-sm text-muted-foreground">
          {field.fieldConfig.description}
        </p>
      )}
      {!hideHelperText && error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
