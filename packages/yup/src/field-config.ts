import type { FieldConfig } from "@dual-autoform/core";
import type { YupField } from "./types";

export const YUP_FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");

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
  const transformFunction = function (value: any) {
    return value; // Always pass, we're just using this for metadata
  };
  transformFunction[YUP_FIELD_CONFIG_SYMBOL] = config;

  return transformFunction;
}

export function getYupFieldConfig(schema: YupField): FieldConfig | undefined {
  for (const transform of schema.transforms) {
    if (transform && YUP_FIELD_CONFIG_SYMBOL in transform) {
      return (transform as any)[YUP_FIELD_CONFIG_SYMBOL];
    }
  }

  return undefined;
}
