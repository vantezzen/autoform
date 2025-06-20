import * as z from "zod/v4/core";

export function getDefaultValueInZodStack(schema: z.$ZodType): any {
  if (schema instanceof z.$ZodDefault) {
    return schema._zod.def.defaultValue;
  }
  else if('innerType' in schema._zod.def) {
    return getDefaultValueInZodStack(schema._zod.def.innerType as z.$ZodType)
  }
  return undefined;
}

export function getDefaultValues(schema: z.$ZodObject): Record<string, any> {
  const shape = schema._zod.def.shape;

  const defaultValues: Record<string, any> = {};

  for (const [key, field] of Object.entries(shape)) {
    const defaultValue = getDefaultValueInZodStack(field);
    if (defaultValue !== undefined) {
      defaultValues[key] = defaultValue;
    }
  }

  return defaultValues;
}
