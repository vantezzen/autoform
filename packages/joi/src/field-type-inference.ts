import { FieldConfig } from "@autoform/core";
import { JoiField } from "./types";

export function inferFieldType(
  schema: JoiField,
  fieldConfig?: FieldConfig
): string {
  if (fieldConfig?.fieldType) {
    return fieldConfig.fieldType;
  }

  const isEnum: boolean =
    schema?.type === "any" && (schema as any)?._valids?._values?.size > 0;
  if (isEnum) {
    return "select";
  }

  if (
    schema.type &&
    ["string", "number", "boolean", "date", "array", "object"].includes(
      schema.type
    )
  ) {
    return schema.type;
  }
  return "string"; // Default to string for unknown types
}
