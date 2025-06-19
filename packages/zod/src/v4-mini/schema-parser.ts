import { z } from "zod/v4-mini";
import { inferFieldType } from "./field-type-inference";
import { getDefaultValueInZodStack } from "./default-values";
import { getFieldConfigInZodStack } from "./field-config";
import { ParsedField, ParsedSchema } from "@autoform/core";

function parseField(key: string, schema: z.ZodMiniType): ParsedField {
	const baseSchema = getBaseSchema(schema);
	const fieldConfig = getFieldConfigInZodStack(schema);
	const type = inferFieldType(baseSchema, fieldConfig);
	const defaultValue = getDefaultValueInZodStack(schema);

	// Enums
	const options = (baseSchema as z.ZodMiniEnum).def.entries;
	let optionValues: [string, string][] = [];
	if (options) {
		if (!Array.isArray(options)) {
			optionValues = Object.entries(options) as [string, string][];
		} else {
			optionValues = options.map((value) => [value, value]);
		}
	}

	// Arrays and objects
	let subSchema: ParsedField[] = [];
	if (baseSchema instanceof z.ZodMiniObject) {
		subSchema = Object.entries(baseSchema.shape).map(([key, field]) =>
			parseField(key, field as z.ZodMiniType)
		);
	}
	if (baseSchema instanceof z.ZodMiniArray) {
		subSchema = [parseField("0", baseSchema.def.element as z.ZodMiniType)];
	}

	return {
		key,
		type,
		required: !schema.safeParse(undefined).success,
		default: defaultValue,
		description: "description is not supported in zod-mini",
		fieldConfig,
		options: optionValues,
		schema: subSchema,
	};
}

export function parseSchema(schema: z.ZodMiniObject): ParsedSchema {
	const shape = schema.shape;

	const fields: ParsedField[] = Object.entries(shape).map(([key, field]) =>
		parseField(key, field as z.ZodMiniAny)
	);

	return { fields };
}

function getBaseSchema<SchemaType extends z.ZodMiniType>(
	schema: SchemaType | z.ZodMiniDefault<SchemaType>
): SchemaType {
	if ("innerType" in schema.def) {
		return getBaseSchema(schema.def.innerType as SchemaType);
	}

	return schema as SchemaType;
}
