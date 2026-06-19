import type { ParsedField } from "@acp-autoform/core";

export function getArrayItemDefaultValue(parsedField: ParsedField): any {
  const itemType = parsedField.schema?.[0]?.type;
  if (itemType === "object") return {};
  if (itemType === "array") return [];
  return null;
}
