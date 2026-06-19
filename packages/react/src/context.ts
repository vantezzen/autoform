import { createContext, useContext } from "react";
import { AutoFormContextType, UseFieldReturn } from "./types";

const AutoFormContext = createContext<AutoFormContextType | null>(null);

export const AutoFormProvider = AutoFormContext.Provider;

export function useAutoForm() {
  const context = useContext(AutoFormContext);
  if (!context) {
    throw new Error("useAutoForm must be used within an AutoFormProvider");
  }
  return context;
}

/**
 * Context-delegating useField hook.
 * UI components call this. The actual implementation is injected by whichever
 * form library adapter (./react-hook-form or ./tanstack-form) wraps the tree.
 */
export function useField(opts: { name: string }): UseFieldReturn {
  const { useField: impl } = useAutoForm();
  return impl(opts);
}
