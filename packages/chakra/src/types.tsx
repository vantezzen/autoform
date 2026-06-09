import type { ExtendableAutoFormProps, FieldValues } from "@acp-autoform/react";
import { ColorModeProviderProps } from "./components/ui/color-mode";

export interface AutoFormProps<
  T extends FieldValues,
> extends ExtendableAutoFormProps<T> {
  colorModeProps?: ColorModeProviderProps;
}
