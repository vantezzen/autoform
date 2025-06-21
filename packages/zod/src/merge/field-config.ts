import { FieldConfig } from "@autoform/core";
import { getFieldConfigInZodStack as v3GetFieldConfig } from "../v3/field-config";
import { getFieldConfigInZodStack as v4GetFieldConfig } from "../v4/field-config";
import { isZodV4Schema, AnyZodSchema, ZOD_FIELD_CONFIG_SYMBOL } from "../utils";

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
) {
  const refinementFunction = () => {};

  refinementFunction[ZOD_FIELD_CONFIG_SYMBOL] = config;

  return refinementFunction;
}

export function getFieldConfigInZodStack(
  schema: AnyZodSchema
): FieldConfig | undefined {
  if (isZodV4Schema(schema)) {
    return v4GetFieldConfig(schema);
  }
  return v3GetFieldConfig(schema as any);
}
