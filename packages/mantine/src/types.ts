import { ExtendableAutoFormProps } from "@autoform/react/src/types";
import { MantineProvider } from "@mantine/core";
import { FieldValues } from "react-hook-form";

export interface AutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {
  theme?: Parameters<typeof MantineProvider>[0]["theme"];
}
