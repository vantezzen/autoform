import {
  AutoFormProps as BaseAutoFormProps,
  ExtendableAutoFormProps,
} from "@autoform/react";
import { ThemeProvider } from "@mui/material/styles";
import { FieldValues } from "react-hook-form";

export interface AutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {
  theme?: Parameters<typeof ThemeProvider>[0]["theme"];
}
