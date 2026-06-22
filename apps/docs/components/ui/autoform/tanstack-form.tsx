import React from "react";
import { AutoForm as BaseAutoForm } from "@acp-autoform/shadcn/components/ui/autoform/tanstack-form";
import type { ExtendableAutoFormProps } from "@acp-autoform/react";

export function AutoForm<T extends Record<string, any>>(props: ExtendableAutoFormProps<T>) {
  return (
    <div className="autoform-preview-container">
      <BaseAutoForm {...props} />
    </div>
  );
}

export type { ExtendableAutoFormProps };
