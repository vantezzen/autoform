import { isZodV4Schema, AnyZodObject } from "../utils";
import { validateSchema as v3ValidateSchema } from "../v3/validator";
import { validateSchema as v4ValidateSchema } from "../v4/validator";

export function validateSchema(schema: AnyZodObject, values: any) {
  if (isZodV4Schema(schema)) {
    return v4ValidateSchema(schema, values);
  }
  return v3ValidateSchema(schema, values);
}
