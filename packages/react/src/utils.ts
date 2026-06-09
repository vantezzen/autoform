import { SchemaProvider, replaceEmptyValue } from "@acp-autoform/core";
import React from "react";

import {
  FieldPath,
  FieldValues,
  Resolver,
  ResolverOptions,
  ResolverResult,
  useController,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";

/**
 * Alias for react-hook-form's useController to be used internally by UI packages
 * to avoid adding react-hook-form as a direct dependency.
 */
export { useController as useField } from "react-hook-form";

/**
 * This custom hook shares the same props and methods as register
 * @returns Return value of `register`
 */
export function useRegister<TFieldValues extends FieldValues = FieldValues>(
  ...props: Parameters<UseFormRegister<TFieldValues>>
) {
  const { register } = useFormContext<TFieldValues>();
  return register(...props);
}

/**
 * Retrieves the error of a field using given error object and field path.
 *
 * @param obj - errors object form react-hook-form.
 * @param path - field path.
 */
export function getPathInObject(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    current = current[key];

    if (current === undefined) {
      return undefined;
    }
  }
  return current.message ? current : (current.root ?? current);
}

/**
 * Recursively focuses the first and deepest input element with an error, if found.
 * React Hook Form only focuses parent-level errors, so we drill down to the deepest
 * field. (eg. to focus inner array items instead of the array field itself.)
 * Ref: https://react-hook-form.com/docs/useform#resolver:~:text=Schema%20validation%20focuses%20on%20field%2Dlevel%20error%20reporting.%20Parent%2Dlevel%20error%20checking%20is%20limited%20to%20the%20direct%20parent%20level%2C%20which%20is%20applicable%20for%20components%20such%20as%20group%20checkboxes.
 */
export function focusError(errors: Record<string, any>): boolean {
  if (!errors || typeof errors !== "object") return false;

  if (typeof errors?.ref?.focus === "function") {
    errors.ref.focus();
    return true;
  }

  for (const val of Object.values(errors)) {
    if (typeof val === "object") {
      if (focusError(val)) return true;
    }
  }

  return false;
}

/**
 * Wraps the form submit handler to stop event propagation before executing it.
 *
 * @param callback - The form submit handler to run after stopping propagation.
 * @returns A new handler that stops propagation and then calls the callback.
 */
export const preventPropagation =
  (callback: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    await callback(e);
  };

/**
 * Creates a React Hook Form resolver for an AutoForm schema provider.
 *
 * @param schema - AutoForm schema provider with `schemaType` and `getSchema`.
 *
 * @returns A React Hook Form resolver that validates cleaned form values.
 */
export function createSchemaResolver<T extends FieldValues>(
  schema: SchemaProvider<T>,
): Resolver<T> {
  let resolverPromise: Promise<Resolver<T>> | undefined;

  return async (
    values: T,
    ctx: any,
    options: ResolverOptions<T>,
  ): Promise<ResolverResult<T>> => {
    const cleanedValues = replaceEmptyValue(values);
    resolverPromise ??= getSchemaResolver(schema);
    const resolver = await resolverPromise;
    return resolver(cleanedValues, ctx, options);
  };
}

/**
 * Gets the library-specific React Hook Form resolver for a schema provider.
 *
 * @param schema - AutoForm schema provider with resolver metadata.
 *
 * @returns The matching resolver.
 */
async function getSchemaResolver<T extends FieldValues>(
  schema: SchemaProvider<T>,
): Promise<Resolver<T>> {
  const rawSchema = schema.getSchema?.();
  if (!schema.schemaType || !rawSchema) {
    throw new Error(
      "AutoForm: schema provider must expose schemaType and getSchema() to use resolver validation.",
    );
  }

  switch (schema.schemaType) {
    case "zod": {
      const { zodResolver } = await import("@hookform/resolvers/zod");
      return zodResolver(rawSchema as any) as Resolver<T>;
    }
    case "yup": {
      const { yupResolver } = await import("@hookform/resolvers/yup");
      return yupResolver(rawSchema as any) as Resolver<T>;
    }
    case "joi": {
      const { joiResolver } = await import("@hookform/resolvers/joi");
      return joiResolver(rawSchema as any) as Resolver<T>;
    }
  }

  throw new Error(`AutoForm: unsupported schema type "${schema.schemaType}".`);
}
