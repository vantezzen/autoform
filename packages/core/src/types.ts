export type Renderable<AdditionalRenderable = null> =
  | string
  | number
  | boolean
  | null
  | undefined
  | AdditionalRenderable;

export interface FieldConfig<
  AdditionalRenderable = null,
  FieldTypes = string,
  FieldWrapper = any,
  CustomData = Record<string, any>,
> {
  description?: Renderable<AdditionalRenderable>;
  inputProps?: Record<string, any>;
  label?: Renderable<AdditionalRenderable>;
  fieldType?: FieldTypes;
  order?: number;
  fieldWrapper?: FieldWrapper;
  customData?: CustomData;
}

export interface ParsedField<AdditionalRenderable = null, FieldTypes = string> {
  key: string;
  type: string;
  required: boolean;
  default?: any;
  description?: Renderable;
  fieldConfig?: FieldConfig<AdditionalRenderable, FieldTypes>;

  // Field-specific
  options?: [string, string][]; // [value, label] for enums
  schema?: ParsedField<AdditionalRenderable, FieldTypes>[]; // For objects and arrays
}

export interface ParsedSchema<
  AdditionalRenderable = null,
  FieldTypes = string,
> {
  fields: ParsedField<AdditionalRenderable, FieldTypes>[];
}

export type SuccessfulSchemaValidation = {
  success: true;
  data: any;
};
export type SchemaValidationError = {
  path: (string | number)[];
  message: string;
};
export type ErrorSchemaValidation = {
  success: false;
  errors: SchemaValidationError[];
};
export type SchemaValidation =
  | SuccessfulSchemaValidation
  | ErrorSchemaValidation;
