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
        const newError = getPathInObject(errors, path)?.message as
          | string
          | undefined;
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

  return getPathInObject(errors, path)?.message as string | undefined;
};
