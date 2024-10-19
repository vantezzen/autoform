import { SchemaProvider } from "./schema-provider";
import { ParsedSchema } from "./types";

export function parseSchema(schemaProvider: SchemaProvider): ParsedSchema {
  return schemaProvider.parseSchema();
}

export function validateSchema(schemaProvider: SchemaProvider, values: any) {
  return schemaProvider.validateSchema(values);
}

export function getDefaultValues(
  schemaProvider: SchemaProvider
): Record<string, any> {
  return schemaProvider.getDefaultValues();
}

// Recursively remove empty values from an object (null, undefined, "", [], {})
export function removeEmptyValues<T extends Record<string, any>>(
  values: T
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in values) {
    const value = values[key];
    if ([null, undefined, "", [], {}].includes(value)) {
      continue;
    }

    if (Array.isArray(value)) {
      const newArray = value.map((item: any) => {
        if (typeof item === "object") {
          return removeEmptyValues(item);
        }
        return item;
      });
      result[key] = newArray.filter((item: any) => item !== null);
    } else if (typeof value === "object") {
      result[key] = removeEmptyValues(value) as any;
    } else {
      result[key] = value;
    }
  }

  return result;
}
