import * as z from "zod/v4/core";
import { inferFieldType } from "./field-type-inference";
import { getDefaultValueInZodStack } from "./default-values";
import { getFieldConfigInZodStack } from "./field-config";
import { ParsedField, ParsedSchema } from "@autoform/core";

function parseField(key: string, schema: z.$ZodType): ParsedField {
  const baseSchema = getBaseSchema(schema);
  const fieldConfig = getFieldConfigInZodStack(schema);
  const type = inferFieldType(baseSchema, fieldConfig);
  const defaultValue = getDefaultValueInZodStack(schema);

  // Enums
  const options = (baseSchema as z.$ZodEnum)._zod.def.entries;
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
  if (baseSchema instanceof z.$ZodObject) {
    subSchema = Object.entries(baseSchema._zod.def.shape).map(([key, field]) =>
      parseField(key, field as z.$ZodType)
    );
  }
  if (baseSchema instanceof z.$ZodArray) {
    subSchema = [parseField("0", baseSchema._zod.def.element as z.$ZodType)];
  }

  return {
    key,
    type,
    required: !isOptional(schema),
    default: defaultValue,
    description: getDescription(schema),
    fieldConfig,
    options: optionValues,
    schema: subSchema,
  };
}

export function parseSchema(schema: z.$ZodObject): ParsedSchema {
  const shape = schema._zod.def.shape;

  const fields: ParsedField[] = Object.entries(shape).map(([key, field]) =>
    parseField(key, field as z.$ZodType)
  );

  return { fields };
}

function getBaseSchema<SchemaType extends z.$ZodType>(
  schema: SchemaType | z.$ZodDefault<SchemaType>
): SchemaType {
  if ("innerType" in schema._zod.def) {
    return getBaseSchema(schema._zod.def.innerType as SchemaType);
  }

  return schema as SchemaType;
}

function isOptional<SchemaType extends z.$ZodType>(
  schema: SchemaType
): boolean {
  if (schema._zod.def.type === "optional") {
    return true;
  }

  if ("innerType" in schema._zod.def) {
    return isOptional(schema._zod.def.innerType as SchemaType);
  }

  return false;
}

function getDescription<SchemaType extends z.$ZodType>(
  schema: SchemaType
): string | undefined {
  const description = z.globalRegistry.get(schema)?.description;
  if (description) {
    return description;
  }

  if ("innerType" in schema._zod.def) {
    return getDescription(schema._zod.def.innerType as SchemaType);
  }

  return undefined;
}
