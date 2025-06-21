import { ZodObjectOrWrapped } from "../v3";
import { isZodV4Schema, AnyZodObject } from "../utils";
import { ZodProvider as V3Provider } from "../v3/provider";
import { ZodProvider as V4Provider } from "../v4/provider";
import { SchemaProvider, ParsedSchema, SchemaValidation } from "@autoform/core";

export class ZodProvider<T extends AnyZodObject>
  implements SchemaProvider<any>
{
  private Provider: SchemaProvider;

  /**
   * Provider to use Zod schemas for AutoForm
   *
   * @param schema - Zod schema to use for validation
   */
  constructor(schema: T) {
    if (!schema) {
      throw new Error("ZodProvider: schema is required");
    }

    if (isZodV4Schema(schema)) {
      this.Provider = new V4Provider(schema);
    } else {
      this.Provider = new V3Provider<ZodObjectOrWrapped>(schema);
    }
  }

  parseSchema(): ParsedSchema {
    return this.Provider.parseSchema();
  }

  validateSchema(values: any): SchemaValidation {
    return this.Provider.validateSchema(values);
  }

  getDefaultValues(): Record<string, any> {
    return this.Provider.getDefaultValues();
  }
}
