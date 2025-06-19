import { z } from "zod/v4-mini";
import { FieldConfig } from "@autoform/core";

interface FieldConfigMeta {
	fieldConfig: FieldConfig<any, any, any, any>;
	[key: string]: unknown;
}

const fieldConfigRegistry = z.registry<FieldConfigMeta>();

type FieldConfigReturn = [typeof fieldConfigRegistry, FieldConfigMeta];

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
): FieldConfigReturn {
	return [fieldConfigRegistry, { fieldConfig: config }];
}

export function getFieldConfigInZodStack(
	schema: z.ZodMiniType
): FieldConfig | undefined {
	return fieldConfigRegistry.get(schema)?.fieldConfig;
}
