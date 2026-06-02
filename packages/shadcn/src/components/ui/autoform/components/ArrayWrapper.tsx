import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrayWrapperProps } from "@acp-autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  error,
  children,
  onAddItem,
  inputProps,
}) => {
  const { key, ref, ...props } = inputProps;

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h3
          className={`text-md font-medium focus:outline-none rounded-md px-2 py-1 transition-colors ${
            error
              ? "focus:border focus:border-destructive focus:ring-1 focus:ring-destructive/50"
              : ""
          }`}
          ref={ref}
          tabIndex={-1}
          aria-describedby={`${key}-error ${key}-description`}
        >
          {label}
          {field.required && <span className="text-destructive"> *</span>}
        </h3>
        {field.fieldConfig?.description && (
          <p
            className="text-sm text-muted-foreground"
            id={key + "-description"}
          >
            {field.fieldConfig.description}
          </p>
        )}
        {error && (
          <p className="text-sm text-destructive" id={key + "-error"}>
            {error}
          </p>
        )}
      </div>
      {children}
      <Button
        {...props}
        size="sm"
        type="button"
        variant="outline"
        onClick={onAddItem}
        aria-label={`add ${label}`}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
