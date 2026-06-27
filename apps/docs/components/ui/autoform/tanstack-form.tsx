import React from "react";
import { AutoForm as BaseAutoForm } from "@dual-autoform/shadcn/components/ui/autoform/tanstack-form";
import type { ExtendableAutoFormProps } from "@dual-autoform/react";

export function AutoForm<T extends Record<string, any>>(props: ExtendableAutoFormProps<T>) {
  return (
    <div className="autoform-preview-container">
      <BaseAutoForm {...props} />
    </div>
  );
}

export type { ExtendableAutoFormProps };
