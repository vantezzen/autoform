import { JoiObjectOrWrapped } from "./types";

export function validateSchema(schema: JoiObjectOrWrapped, values: any) {
  const { error, value } = schema.validate(values, { abortEarly: false });
  if (error) {
    return {
      success: false,
      errors: error.details.map((item) => ({
        path: item.path,
        message: item.message,
      })),
    } as const;
  } else return { success: true, data: value } as const;
}
