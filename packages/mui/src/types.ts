import type { ExtendableAutoFormProps, FieldValues } from "@autoform/react";
import { ThemeProvider } from "@mui/material/styles";

export interface AutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {
  theme?: Parameters<typeof ThemeProvider>[0]["theme"];
}
