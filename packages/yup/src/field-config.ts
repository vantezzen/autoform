import { FieldConfig } from "@autoform/core";
import { YupField } from "./types";

export const YUP_FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");

export function fieldConfig<
  AdditionalRenderable = null,
  FieldTypes = string,
  FieldWrapper = any,
  CustomData = {},
>(
  config: FieldConfig<
    AdditionalRenderable,
    FieldTypes,
    FieldWrapper,
    CustomData
  >
) {
  const transformFunction = function (value: any) {
    return value; // Always pass, we're just using this for metadata
  };
  transformFunction[YUP_FIELD_CONFIG_SYMBOL] = config;

  return transformFunction;
}

export function getYupFieldConfig(schema: YupField): FieldConfig | undefined {
  for (const transform of schema.transforms) {
    if (YUP_FIELD_CONFIG_SYMBOL in transform) {
      return (transform as any)[YUP_FIELD_CONFIG_SYMBOL];
    }
  }

  return undefined;
}
