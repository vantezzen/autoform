import { z } from "zod/v4";

export function getDefaultValueInZodStack(schema: z.ZodType): any {
  if (schema instanceof z.ZodDefault) {
    return schema.def.defaultValue;
  }

  return undefined;
}

export function getDefaultValues(schema: z.ZodObject): Record<string, any> {
  const shape = schema.shape;

  const defaultValues: Record<string, any> = {};

  for (const [key, field] of Object.entries(shape)) {
    const defaultValue = getDefaultValueInZodStack(field);
    if (defaultValue !== undefined) {
      defaultValues[key] = defaultValue;
    }
  }

  return defaultValues;
}
