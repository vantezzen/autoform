import { createContext, useContext } from "react";
import type { UseFieldFn, UseFieldReturn } from "@dual-autoform/react";

const FieldHookContext = createContext<UseFieldFn | null>(null);

export const FieldHookProvider = FieldHookContext.Provider;

export function useField(opts: { name: string }): UseFieldReturn {
  const impl = useContext(FieldHookContext);
  if (!impl) {
    throw new Error("useField must be used within an AutoForm provider");
  }
  return impl(opts);
}
