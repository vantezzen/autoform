import { z } from "zod/v4";

export function validateSchema(schema: z.ZodObject, values: any) {
  try {
    schema.parse(values);
    return { success: true, data: values };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.issues };
    }
    throw error;
  }
}
