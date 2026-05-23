import React from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
  inputProps,
}) => {
  const { key, ref, ...props } = inputProps;

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h3
          className="text-md font-medium"
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
        {props.error && (
          <p className="text-sm text-destructive" id={key + "-error"}>
            {props.error}
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
