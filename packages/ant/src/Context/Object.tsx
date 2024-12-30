import { createContext, useContext, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { AntObjectProviderProps } from "../types";

// add formProps to useFormContext
const ObjectContext = createContext<{
  control: ControllerRenderProps<any> | undefined;
  label: string;
  getValues: (value?: string) => any;
} | null>(null);

function ObjectProvider({
  children,
  control,
  label,
  getValues,
}: AntObjectProviderProps) {
  const [formContext] = useState<{
    control: ControllerRenderProps<any> | undefined;
    label: string;
    getValues: (value?: string) => any;
  }>({ control, label, getValues });

  return (
    <ObjectContext.Provider
      value={{
        control: formContext?.control,
        label: formContext?.label,
        getValues: formContext?.getValues,
      }}
    >
      {children}
    </ObjectContext.Provider>
  );
}
// add objectContext to useObjectContext
export function useObjectContext() {
  const context = useContext(ObjectContext);
  if (!context) return;
  return context;
}

export default ObjectProvider;
