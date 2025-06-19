import { FieldConfig } from "@autoform/core";
import { z } from "zod/v4-mini";

export function inferFieldType(
	schema: z.ZodMiniType,
	fieldConfig?: FieldConfig
): string {
	if (fieldConfig?.fieldType) {
		return fieldConfig.fieldType;
	}

	if (schema instanceof z.ZodMiniObject) return "object";
	if (schema instanceof z.ZodMiniString) return "string";
	if (schema instanceof z.ZodMiniNumber) return "number";
	if (schema instanceof z.ZodMiniBoolean) return "boolean";
	if (schema instanceof z.ZodMiniDate) return "date";
	if (schema instanceof z.ZodMiniEnum) return "select";
	if (schema instanceof z.ZodMiniArray) return "array";

	return "string"; // Default to string for unknown types
}
