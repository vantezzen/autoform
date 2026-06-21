import { SchemaProvider, replaceEmptyValue } from "@acp-autoform/core";
import {
  FieldValues,
  Resolver,
  ResolverOptions,
  ResolverResult,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";

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
      "AutoForm: schema provider must expose schemaType and getSchema() " +
        "to use resolver validation.",
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
