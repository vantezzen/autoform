import { ExtendableAutoFormProps } from "@autoform/react";
import { FieldValues } from "react-hook-form";
import { ColorModeProviderProps } from "./components/ui/color-mode";

export interface AutoFormProps<T extends FieldValues>
  extends ExtendableAutoFormProps<T> {
    colorModeProps?: ColorModeProviderProps;
  }
