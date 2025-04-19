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
  let optionValues: [string, string][] = [];
  const enumSchema = (schema as unknown as JoiEnumSchema)._valids;
  if (enumSchema._values && enumSchema._values.size > 0) {
    const options = enumSchema._values;
    optionValues = [...options].map((value) => [value, value]);
  }

  // Arrays and objects
  let subSchema: ParsedField[] = [];
  const objectFields = schema.$_terms.keys as TObjectFields;
  if (schema.type === "object" && objectFields) {
    subSchema = Object.values(objectFields).map((field) =>
      parseField(field.key, field.schema)
    );
  }
  const arrayFields = schema.$_terms.items[0] as JoiField;
  if (schema.type === "array" && arrayFields) {
    subSchema = [parseField("0", arrayFields)];
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
