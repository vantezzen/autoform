import { inferFieldType } from "./field-type-inference";
import { getJoiDefaultValue } from "./default-values";
import { getJoiFieldConfig } from "./field-config";
import { ParsedField, ParsedSchema } from "@autoform/core";
import {
  JoiEnumSchema,
  JoiField,
  JoiObjectOrWrapped,
  TObjectFields,
} from "./types";

function parseField(key: string, schema: JoiField): ParsedField {
  const fieldConfig = getJoiFieldConfig(schema);
  const type = inferFieldType(schema, fieldConfig);
  const defaultValue = getJoiDefaultValue(schema);
  const isRequired = schema._flags?.presence === "required";

  // Enums
  const options = (schema as unknown as JoiEnumSchema)?._valids?._values;
  let optionValues: [string, string][] = [];
  if (options instanceof Set && options.size > 0) {
    optionValues = [...options].map((value) => [value, value]);
  }

  // Arrays and objects
  let subSchema: ParsedField[] = [];
  const objectFields: undefined | TObjectFields = schema?.$_terms?.keys;
  if (schema.type === "object" && objectFields) {
    subSchema = Object.values(objectFields).map((field) =>
      parseField(field.key, field.schema)
    );
  }
  const arrayFields: undefined | JoiField[] = schema?.$_terms?.items;
  if (schema.type === "array" && Array.isArray(arrayFields) && arrayFields[0]) {
    subSchema = [parseField("0", arrayFields[0])];
  }

  return {
    key,
    type,
    required: !!isRequired,
    default: defaultValue,
    description: schema._flags?.label,
    fieldConfig,
    options: optionValues,
    schema: subSchema,
  };
}

export function parseSchema(schema: JoiObjectOrWrapped): ParsedSchema {
  const objectFields = schema.$_terms.keys as TObjectFields;

  const fields: ParsedField[] = Object.values(objectFields).map((field) =>
    parseField(field.key, field.schema as JoiField)
  );

  return { fields };
}
