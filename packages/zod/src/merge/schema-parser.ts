import type { ParsedSchema } from "@dual-autoform/core";
import { isZodV4Schema } from "../utils";
import type { AnyZodObject } from "../utils";
import { parseSchema as v3ParseSchema } from "../v3/schema-parser";
import { parseSchema as v4ParseSchema } from "../v4/schema-parser";

export function parseSchema(schema: AnyZodObject): ParsedSchema {
  if (isZodV4Schema(schema)) {
    return v4ParseSchema(schema);
  }
  return v3ParseSchema(schema);
}
