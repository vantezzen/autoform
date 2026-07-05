import type { ExtendableAutoFormProps } from "@autoform/react";
import { MantineProvider } from "@mantine/core";

export interface AutoFormProps<
  T extends Record<string, any> = Record<string, any>,
> extends ExtendableAutoFormProps<T> {
  theme?: Parameters<typeof MantineProvider>[0]["theme"];
}
