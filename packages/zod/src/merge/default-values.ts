import { isZodV4Schema, AnyZodSchema, AnyZodObject } from "../utils";
import {
  getDefaultValueInZodStack as v3GetDefault,
  getDefaultValues as v3GetDefaults,
} from "../v3/default-values";
import {
  getDefaultValueInZodStack as v4GetDefault,
  getDefaultValues as v4GetDefaults,
} from "../v4/default-values";

export function getDefaultValueInZodStack(schema: AnyZodSchema): any {
  if (isZodV4Schema(schema)) {
    return v4GetDefault(schema);
  }
  return v3GetDefault(schema);
}

export function getDefaultValues(schema: AnyZodObject): Record<string, any> {
  if (isZodV4Schema(schema)) {
    return v4GetDefaults(schema);
  }
  return v3GetDefaults(schema);
}
