import React from "react";
import type { ObjectWrapperProps } from "@dual-autoform/react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
  parsedField,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{label}</h3>
        {parsedField.fieldConfig?.description && (
          <div className="text-sm text-muted-foreground">
            {parsedField.fieldConfig.description}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
