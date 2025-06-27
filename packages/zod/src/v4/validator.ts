import * as z from "zod/v4/core";

export function validateSchema(schema: z.$ZodObject, values: any) {
  try {
    z.parse(schema, values);
    return { success: true, data: values };
  } catch (error) {
    if (error instanceof z.$ZodError) {
      return { success: false, errors: error.issues };
    }
    throw error;
  }
}
