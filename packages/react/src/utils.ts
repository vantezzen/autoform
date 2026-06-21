import type { ParsedField } from "@acp-autoform/core";

export function getArrayItemDefaultValue(parsedField: ParsedField): any {
  const itemField = parsedField.schema?.[0];
  if (!itemField) return null;
  if (itemField.default !== undefined) return itemField.default;
  if (itemField.type === "object") return getObjectDefaultValue(itemField);
  if (itemField.type === "array") return [];
  return null;
}

function getObjectDefaultValue(parsedField: ParsedField): Record<string, any> {
  const value: Record<string, any> = {};

  for (const child of parsedField.schema ?? []) {
    if (child.default !== undefined) {
      value[child.key] = child.default;
    } else if (child.required && child.type === "object") {
      value[child.key] = getObjectDefaultValue(child);
    } else if (child.required && child.type === "array") {
      value[child.key] = [];
    }
  }

  return value;
}
