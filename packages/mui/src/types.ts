import type { ExtendableAutoFormProps } from "@dual-autoform/react";
import { ThemeProvider } from "@mui/material/styles";

export interface AutoFormProps<
  T extends Record<string, any> = Record<string, any>
> extends ExtendableAutoFormProps<T> {
  theme?: Parameters<typeof ThemeProvider>[0]["theme"];
}
