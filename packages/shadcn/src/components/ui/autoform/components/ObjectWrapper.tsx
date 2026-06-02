import React from "react";
import { ObjectWrapperProps } from "@acp-autoform/react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  field,
  children,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">{label}</h3>
        {field.fieldConfig?.description && (
          <p className="text-sm text-muted-foreground">
            {field.fieldConfig.description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};
