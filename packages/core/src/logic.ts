import { SchemaProvider } from "./schema-provider";
import { ParsedField, ParsedSchema } from "./types";

function assertSchemaProvider(
  schemaProvider: SchemaProvider | undefined,
): asserts schemaProvider is SchemaProvider {
  if (!schemaProvider) {
    throw new Error("AutoForm requires a schema prop. Provide a schema.");
  }

  if (
    typeof schemaProvider.parseSchema !== "function" ||
    typeof schemaProvider.validateSchema !== "function" ||
    typeof schemaProvider.getDefaultValues !== "function"
  ) {
    throw new Error(
      'AutoForm schema must be a schema provider. For Zod, import { ZodProvider } from "@dual-autoform/zod" and pass schema={new ZodProvider(schema)}.',
    );
  }
}

export function parseSchema(schemaProvider: SchemaProvider): ParsedSchema {
  assertSchemaProvider(schemaProvider);
  const schema = schemaProvider.parseSchema();
  return {
    ...schema,
    fields: sortFieldsByOrder(schema.fields),
  };
}

export function validateSchema(schemaProvider: SchemaProvider, values: any) {
  assertSchemaProvider(schemaProvider);
  return schemaProvider.validateSchema(values);
}

export function getDefaultValues(
  schemaProvider: SchemaProvider,
): Record<string, any> {
  assertSchemaProvider(schemaProvider);
  return schemaProvider.getDefaultValues();
}

/**
 * Recursively remove empty values from an object (null, undefined, '')
 * Used in AutoForm before calling the resolver to prevent empty values from being validated.
 * This is necessary because zod's optional() allows undefined, but form fields default to
 * empty strings even when untouched. These defaults makes the optional() unusable.
 * and cause validation issues in react-hook-form.
 */

export function removeEmptyValues<T extends Record<string, any>>(
  values: T,
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in values) {
    const value = values[key];
    // includes method cannot check {}, []
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

/**
 * Recursively replaces empty values from an object (null, undefined, "", [], {}).
 * - Retains objects such as (Date, RegExp, functions, etc.) used in resolver.
 */
const isPlainObject = (value: any): boolean =>
  typeof value === "object" &&
  Object.prototype.toString.call(value) === "[object Object]";

const isEmpty = (value: any): boolean => [null, undefined, ""].includes(value); // includes method cannot check {}, []

export function replaceEmptyValue<T extends Record<string, any>>(values: T): T {
  const result = { ...values };
  for (const key in values) {
    const value = values[key];

    if (isEmpty(value)) {
      (result[key] as any) = undefined;
      continue;
    }

    if (Array.isArray(value)) {
      const cleaned = Object.values(replaceEmptyValue({ ...value }));
      result[key] = cleaned as any;
    } else if (isPlainObject(value)) {
      const cleaned = replaceEmptyValue(value);
      result[key] = cleaned as any;
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Sort the fields by order.
 * If no order is set, the field will be sorted based on the order in the schema.
 */
export function sortFieldsByOrder(
  fields: ParsedField[] | undefined,
): ParsedField[] {
  if (!fields) return [];
  const sortedFields = fields
    .map((field): ParsedField => {
      if (field.schema) {
        return {
          ...field,
          schema: sortFieldsByOrder(field.schema),
        };
      }
      return field;
    })
    .sort((a, b) => {
      const fieldA: number = a.fieldConfig?.order ?? 0;
      const fieldB = b.fieldConfig?.order ?? 0;
      return fieldA - fieldB;
    });

  return sortedFields;
}
