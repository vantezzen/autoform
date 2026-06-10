import { useEffect, useState } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import type { UseFormReturn, FieldValues } from "react-hook-form";
import { getPathInObject } from "./utils";

export const useFieldError = (path: string[]) => {
  const { subscribe } = useFormContext();

  if (typeof subscribe !== "function") {
    return useFieldErrorFallback(path);
  }

  return useFieldErrorSubscribe(path, subscribe);
};

const useFieldErrorSubscribe = (
  path: string[],
  subscribe: UseFormReturn<FieldValues>["subscribe"],
) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const fieldPath = path.join(".");

  useEffect(() => {
    const callback = subscribe({
      formState: {
        errors: true,
      },
      callback: ({ errors }) => {
        let newError = getPathInObject(errors, path)?.message as string | undefined;

        if (!newError) {
          let currentPath = path.join(".");
          while (currentPath.length > 0) {
            const lastDot = currentPath.lastIndexOf(".");
            const lastBracket = currentPath.lastIndexOf("[");
            const cutIndex = Math.max(lastDot, lastBracket);
            
            if (cutIndex === -1) break;
            
            currentPath = currentPath.substring(0, cutIndex);
            // Convert path string back to array path for getPathInObject
            const parentPathArray = currentPath.replace(/\[/g, '.').replace(/\]/g, '').split('.');
            const parentError = getPathInObject(errors, parentPathArray)?.message as string | undefined;
            
            if (parentError && parentError.toLowerCase().includes("required")) {
              newError = parentError;
              break;
            }
          }
        }

        setError((prev) => (prev !== newError ? newError : prev));
      },
    });

    return () => callback();
  }, [fieldPath, subscribe]);

  return error;
};

const useFieldErrorFallback = (path: string[]) => {
  const fieldPath = path.join(".");
  const { errors } = useFormState({
    name: fieldPath as any,
    exact: true,
  });

  let error = getPathInObject(errors, path)?.message as string | undefined;

  if (!error) {
    let currentPath = path.join(".");
    while (currentPath.length > 0) {
      const lastDot = currentPath.lastIndexOf(".");
      const lastBracket = currentPath.lastIndexOf("[");
      const cutIndex = Math.max(lastDot, lastBracket);
      
      if (cutIndex === -1) break;
      
      currentPath = currentPath.substring(0, cutIndex);
      const parentPathArray = currentPath.replace(/\[/g, '.').replace(/\]/g, '').split('.');
      const parentError = getPathInObject(errors, parentPathArray)?.message as string | undefined;
      
      if (parentError && parentError.toLowerCase().includes("required")) {
        error = parentError;
        break;
      }
    }
  }

  return error;
};
