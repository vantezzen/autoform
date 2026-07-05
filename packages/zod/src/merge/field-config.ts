import type { FieldConfig } from "@autoform/core";
import { getFieldConfigInZodStack as v3GetFieldConfig } from "../v3/field-config";
import { getFieldConfigInZodStack as v4GetFieldConfig } from "../v4/field-config";
import { isZodV4Schema, ZOD_FIELD_CONFIG_SYMBOL } from "../utils";
import type { AnyZodSchema } from "../utils";

export function fieldConfig<
  AdditionalRenderable = null,
  FieldTypes = string,
  CustomData = Record<string, any>,
  FieldWrapper = any,
  ObjectWrapper = any,
  ArrayWrapper = any,
  ArrayElementWrapper = any,
>(
  config: FieldConfig<
    AdditionalRenderable,
    FieldTypes,
    CustomData,
    FieldWrapper,
    ObjectWrapper,
    ArrayWrapper,
    ArrayElementWrapper
  >,
) {
  const refinementFunction = () => {};

  refinementFunction[ZOD_FIELD_CONFIG_SYMBOL] = config;

  return refinementFunction;
}

export function getFieldConfigInZodStack(
  schema: AnyZodSchema,
): FieldConfig | undefined {
  if (isZodV4Schema(schema)) {
    return v4GetFieldConfig(schema);
  }
  return v3GetFieldConfig(schema as any);
}
