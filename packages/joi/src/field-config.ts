import { FieldConfig } from "@autoform/core";
import { JoiField } from "./types";

export const JOI_FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");

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
  const transformFunction = function (value: any) {
    return value; // Always pass, we're just using this for metadata
  };
  transformFunction[JOI_FIELD_CONFIG_SYMBOL] = config;

  return transformFunction;
}

export function getJoiFieldConfig(schema: JoiField): FieldConfig | undefined {
  for (const meta of schema.$_terms.metas) {
    if (JOI_FIELD_CONFIG_SYMBOL in meta) {
      return (meta as any)[JOI_FIELD_CONFIG_SYMBOL];
    }
  }

  return undefined;
}
