import { AutoFormProps as BaseAutoFormProps } from "@autoform/react";
import { MantineProvider } from "@mantine/core";
import { FieldValues } from "react-hook-form";

export interface AutoFormProps<T extends FieldValues>
  extends Omit<BaseAutoFormProps<T>, "uiComponents" | "formComponents"> {
  theme?: Parameters<typeof MantineProvider>[0]["theme"];
}
