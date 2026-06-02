import * as yup from "yup";
import { ParsedSchema, SchemaProvider, SchemaValidation } from "@acp-autoform/core";
import { parseSchema } from "./schema-parser";
import { validateSchema } from "./validator";
import { getDefaultValues } from "./default-values";

export class YupProvider<T extends yup.AnyObjectSchema>
  implements SchemaProvider
{
  schemaType = "yup" as const;

  /**
   * Provider to use Yup schemas for AutoForm
   *
   * @param schema - Yup schema to use for validation
   */
  constructor(private schema: T) {
    if (!schema) {
      throw new Error("YupProvider: schema is required");
    }
  }

  parseSchema(): ParsedSchema {
    return parseSchema(this.schema);
  }

  validateSchema(values: any): SchemaValidation {
    return validateSchema(this.schema, values);
  }

  getDefaultValues() {
    return getDefaultValues(this.schema);
  }

  getSchema(): T {
    return this.schema;
  }
}
