import type { ExtendableAutoFormProps, FieldValues } from "@autoform/react";

export interface AutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {}
