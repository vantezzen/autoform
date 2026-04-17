import { inject, provide } from "vue";
import type { InjectionKey } from "vue";
import type { AutoFormContextType } from "./types";

const AutoFormKey: InjectionKey<AutoFormContextType> = Symbol("AutoForm");

export function provideAutoForm(context: AutoFormContextType) {
  provide(AutoFormKey, context);
}

export function useAutoForm(): AutoFormContextType {
  const context = inject(AutoFormKey);
  if (!context) {
    throw new Error("useAutoForm must be used within an AutoForm component");
  }
  return context;
}
