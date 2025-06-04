import { z } from "zod/v4";
import { SchemaProvider, ParsedSchema, SchemaValidation } from "@autoform/core";
import { getDefaultValues } from "./default-values";
import { parseSchema } from "./schema-parser";

export class ZodProvider<T extends z.ZodObject>
  implements SchemaProvider<z.infer<T>>
{
  /**
   * Provider to use Zod schemas for AutoForm
   *
   * @param schema - Zod schema to use for validation
   */
  constructor(private schema: T) {
    if (!schema) {
      throw new Error("ZodProvider: schema is required");
    }
  }

  parseSchema(): ParsedSchema {
    return parseSchema(this.schema);
  }

  validateSchema(values: z.infer<T>): SchemaValidation {
    try {
      const data = this.schema.parse(values);
      return { success: true, data } as const;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: error.issues.map((error) => ({
            path: error.path as string[],
            message: error.message,
          })),
        } as const;
      }
      throw error;
    }
  }

  getDefaultValues(): Record<string, any> {
    return getDefaultValues(this.schema);
  }
}
