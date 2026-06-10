import type { ExtendableAutoFormProps } from "@acp-autoform/react";
import { ColorModeProviderProps } from "./components/ui/color-mode";

export interface AutoFormProps<
  T extends Record<string, any> = Record<string, any>
> extends ExtendableAutoFormProps<T> {
  colorModeProps?: ColorModeProviderProps;
}
