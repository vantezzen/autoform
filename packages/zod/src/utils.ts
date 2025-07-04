import * as zod4 from "zod/v4/core";
import type { ZodTypeAny } from "zod/v3";
import { ZodObjectOrWrapped } from "./v3";

// Same symbol used everywhere
export const ZOD_FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");

export function isZodV4Schema(schema: any): schema is zod4.$ZodType {
  return "_zod" in schema;
}

// Combined types
export type AnyZodSchema = ZodTypeAny | zod4.$ZodType;
export type AnyZodObject = ZodObjectOrWrapped | zod4.$ZodObject;
