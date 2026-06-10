import { SchemaProvider, replaceEmptyValue } from "@acp-autoform/core";
import React from "react";
import {
  FieldPath,
  FieldValues,
  Resolver,
  ResolverOptions,
  ResolverResult,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";

/**
 * Focus the first input element marked as invalid.
 * Used by both RHF (onError) and TanStack (onSubmitInvalid) adapters.
 * AutoFormField auto-injects aria-invalid into inputProps.
 */
export function focusFirstInvalidInput(): void {
  setTimeout(() => {
    // Find the first element marked as invalid natively or via our data attribute
    // Using a combined selector ensures we find the first one in document order
    const firstInvalid = document.querySelector<HTMLElement>(
      '[aria-invalid="true"]'
    );
    
    if (!firstInvalid) return;

    // If the element itself is directly focusable, focus it
    if (
      firstInvalid.tagName === "INPUT" ||
      firstInvalid.tagName === "SELECT" ||
      firstInvalid.tagName === "TEXTAREA" ||
      firstInvalid.tagName === "BUTTON" ||
      firstInvalid.hasAttribute("tabindex")
    ) {
      firstInvalid.focus();
      return;
    }

    // Otherwise, it's a wrapper, find the first focusable input inside it
    const input = firstInvalid.querySelector<HTMLElement>(
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (input) {
      input.focus();
    } else {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 0);
}

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
 * Retrieves the error of a field using given error object and field path.
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
 * Wraps the form submit handler to stop event propagation before executing.
 */
export const preventPropagation =
  (callback: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    await callback(e);
  };

/**
 * Creates a React Hook Form resolver for an AutoForm schema provider.
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
