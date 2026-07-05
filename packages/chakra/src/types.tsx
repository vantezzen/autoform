import type { ExtendableAutoFormProps } from "@autoform/react";
import type { ColorModeProviderProps } from "./components/ui/color-mode";

export interface AutoFormProps<
  T extends Record<string, any> = Record<string, any>
> extends ExtendableAutoFormProps<T> {
  colorModeProps?: ColorModeProviderProps;
}
