import { z } from "zod/v4-mini";

export function getDefaultValueInZodStack(schema: z.ZodMiniType): any {
	if (schema instanceof z.ZodMiniDefault) {
		return schema.def.defaultValue;
	}

	return undefined;
}

export function getDefaultValues(schema: z.ZodMiniObject): Record<string, any> {
	const shape = schema.shape as z.core.$ZodLooseShape;

	const defaultValues: Record<string, any> = {};

	for (const [key, field] of Object.entries(shape)) {
		const defaultValue = getDefaultValueInZodStack(field);
		if (defaultValue !== undefined) {
			defaultValues[key] = defaultValue;
		}
	}

	return defaultValues;
}
