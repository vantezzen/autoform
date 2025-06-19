import { z } from "zod/v4-mini";

export function validateSchema(schema: z.ZodMiniObject, values: any) {
	try {
		schema.parse(values);
		return { success: true, data: values };
	} catch (error) {
		if (error instanceof z.core.$ZodError) {
			return { success: false, errors: error.issues };
		}
		throw error;
	}
}
