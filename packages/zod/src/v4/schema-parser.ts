import { z } from "zod/v4";
import { inferFieldType } from "./field-type-inference";
import { getDefaultValueInZodStack } from "./default-values";
import { getFieldConfigInZodStack } from "./field-config";
import { ParsedField, ParsedSchema } from "@autoform/core";

function parseField(key: string, schema: z.ZodType): ParsedField {
  const baseSchema = getBaseSchema(schema);
  const fieldConfig = getFieldConfigInZodStack(schema);
  const type = inferFieldType(baseSchema, fieldConfig);
  const defaultValue = getDefaultValueInZodStack(schema);

  // Enums
  const options = (baseSchema as z.ZodEnum).def.entries;
  let optionValues: [string, string][] = [];
  if (options) {
    if (!Array.isArray(options)) {
      optionValues = Object.entries(options) as [string, string][];
    } else {
      optionValues = options.map((value) => [value, value]);
    }
  }

  // Arrays and objects
  let subSchema: ParsedField[] = [];
  if (baseSchema instanceof z.ZodObject) {
    subSchema = Object.entries(baseSchema.shape).map(([key, field]) =>
      parseField(key, field as z.ZodTypeAny),
    );
  }
  if (baseSchema instanceof z.ZodArray) {
    subSchema = [parseField("0", baseSchema.def.element as z.ZodType)];
  }

  return {
    key,
    type,
    required: !schema.safeParse(undefined).success,
    default: defaultValue,
    description: schema.description,
    fieldConfig,
    options: optionValues,
    schema: subSchema,
  };
}

export function parseSchema(schema: z.ZodObject): ParsedSchema {
  const shape = schema.shape;

  const fields: ParsedField[] = Object.entries(shape).map(([key, field]) =>
    parseField(key, field as z.ZodTypeAny),
  );

  return { fields };
}

function getBaseSchema<SchemaType extends z.ZodType>(
  schema: SchemaType | z.ZodDefault<SchemaType>,
): SchemaType {
  if ("innerType" in schema.def) {
    return getBaseSchema(schema.def.innerType as SchemaType);
  }

  return schema as SchemaType;
}
