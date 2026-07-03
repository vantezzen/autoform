import type {
  SchemaProvider,
  ParsedSchema,
  SchemaValidation,
} from "@dual-autoform/core";
import { validateSchema } from "./validator";
import { getDefaultValues } from "./default-values";
import { parseSchema } from "./schema-parser";
import type { JoiObjectOrWrapped } from "./types";

export class JoiProvider<
  T extends JoiObjectOrWrapped,
> implements SchemaProvider {
  schemaType = "joi" as const;

  /**
   * Provider to use Joi schemas for AutoForm
   *
   * @param schema - Joi schema to use for validation
   */
  constructor(private schema: T) {
    if (!schema) {
      throw new Error("JoiProvider: schema is required");
    }
  }

  parseSchema(): ParsedSchema {
    return parseSchema(this.schema);
  }

  validateSchema(values: any): SchemaValidation {
    return validateSchema(this.schema, values);
  }

  getDefaultValues(): Record<string, any> {
    return getDefaultValues(this.schema);
  }

  getSchema(): T {
    return this.schema;
  }
}
