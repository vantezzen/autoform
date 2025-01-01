import { FormProps } from "antd";
import { createContext, useContext, useState } from "react";
import { AntFormProviderProps } from "../types";

// add formProps to useFormContext
export const FormContext = createContext<{
  formProps: FormProps | undefined;
} | null>(null);

function FormProvider({ children, formProps }: AntFormProviderProps) {
  const [formContext] = useState<{
    formProps: FormProps;
  }>({ formProps: formProps || {} });
  return (
    <FormContext.Provider
      value={{
        formProps: formContext?.formProps,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
// add formProps to useFormContext
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) return;
  return context;
}

export default FormProvider;
