import * as z from "zod/v4/core";
import { FieldConfig } from "@autoform/core";
export const ZOD_FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");

export function fieldConfig<
  AdditionalRenderable = null,
  FieldTypes = string,
  FieldWrapper = any,
  CustomData = Record<string, any>,
>(
  config: FieldConfig<
    AdditionalRenderable,
    FieldTypes,
    FieldWrapper,
    CustomData
  >
): z.CheckFn<any> {
  const refinementFunction = () => {};

  refinementFunction[ZOD_FIELD_CONFIG_SYMBOL] = config;

  return refinementFunction;
}

export function getFieldConfigInZodStack(
  schema: z.$ZodType
): FieldConfig | undefined {
  const checks = schema._zod.def.checks;
  if (checks) {
    for (const check of checks) {
      const checkFn = check._zod.check;
      if (ZOD_FIELD_CONFIG_SYMBOL in checkFn) {
        return checkFn[ZOD_FIELD_CONFIG_SYMBOL] as FieldConfig;
      }
    }
  }

  if ("innerType" in schema._zod.def) {
    return getFieldConfigInZodStack(schema._zod.def.innerType as z.$ZodType);
  }

  return undefined;
}
