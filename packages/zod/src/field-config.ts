import { RefinementEffect, z } from "zod";
import { FieldConfig } from "@autoform/core";
export const ZOD_FIELD_CONFIG_SYMBOL = Symbol("GetFieldConfig");
export type SuperRefineFunction = () => unknown;

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
): SuperRefineFunction {
  const refinementFunction: SuperRefineFunction = () => {
    // Do nothing.
  };

  // @ts-expect-error This is a symbol and not a real value.
  refinementFunction[ZOD_FIELD_CONFIG_SYMBOL] = config;

  return refinementFunction;
}

export function getFieldConfigInZodStack(
  schema: z.ZodTypeAny
): FieldConfig | undefined {
  const typedSchema = schema as unknown as z.ZodEffects<
    z.ZodNumber | z.ZodString
  >;

  if (typedSchema._def.typeName === "ZodEffects") {
    const effect = typedSchema._def.effect as RefinementEffect<any>;
    const refinementFunction = effect.refinement;

    if (ZOD_FIELD_CONFIG_SYMBOL in refinementFunction) {
      return refinementFunction[ZOD_FIELD_CONFIG_SYMBOL] as FieldConfig;
    }
  }

  if ("innerType" in typedSchema._def) {
    return getFieldConfigInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny
    );
  }
  if ("schema" in typedSchema._def) {
    return getFieldConfigInZodStack(
      (typedSchema._def as any).schema as z.ZodAny
    );
  }

  return undefined;
}
