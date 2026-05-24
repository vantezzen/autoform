import type { ExtendableAutoFormProps, FieldValues } from "@autoform/react";
import { MantineProvider } from "@mantine/core";

export interface AutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {
  theme?: Parameters<typeof MantineProvider>[0]["theme"];
}
