import { useEffect, useState } from "react";
import { useController, useFormContext, useFormState } from "react-hook-form";
import type {
  UseFormReturn,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { getPathInObject } from "./utils";
import { UseFieldFn } from "../types";

/**
 * This custom hook shares the same props and methods as register.
 * @returns Return value of `register`
 */
export function useRegister<TFieldValues extends FieldValues = FieldValues>(
  ...props: Parameters<UseFormRegister<TFieldValues>>
) {
  const { register } = useFormContext<TFieldValues>();
  return register(...props);
}

/**
 * RHF-backed useField implementation.
 * Normalizes useController return to the shared FieldBinding shape.
 */
export const useFieldRHF: UseFieldFn = ({ name }) => {
  const { field } = useController({ name });
  return { field };
};

/**
 * Provides the error message of a field without subscribing to the entire form state.
 * @param path - The path of the field.
 * @returns The error message of the field, or undefined if there is no error.
 */
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
