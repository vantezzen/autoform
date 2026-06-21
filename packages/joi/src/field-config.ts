import { FieldConfig } from "@acp-autoform/core";
import { JoiField } from "./types";

export const JOI_FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");

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
  transformFunction[JOI_FIELD_CONFIG_SYMBOL] = config;

  return transformFunction;
}

export function getJoiFieldConfig(schema: JoiField): FieldConfig | undefined {
  for (const meta of schema.$_terms.metas) {
    if (meta && JOI_FIELD_CONFIG_SYMBOL in meta) {
      return (meta as any)[JOI_FIELD_CONFIG_SYMBOL];
    }
  }

  return undefined;
}
