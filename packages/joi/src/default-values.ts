import { JoiField, JoiObjectOrWrapped, TObjectFields } from "./types";

export function getJoiDefaultValue(schema: JoiField): any {
  return schema._flags.default;
}

export function getDefaultValues(
  schema: JoiObjectOrWrapped
): Record<string, any> {
  const fields = schema.$_terms.keys as TObjectFields;

  const defaultValues: Record<string, any> = {};

  for (const field of Object.values(fields)) {
    if (!field.key || !field.schema) continue;
    const defaultValue = getJoiDefaultValue(field.schema);
    if (defaultValue !== undefined) {
      defaultValues[field.key] = defaultValue;
    }
  }

  return defaultValues;
}
