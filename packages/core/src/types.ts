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
  /** Help text or supporting content rendered near the field. */
  description?: Renderable<AdditionalRenderable>;
  /** Props forwarded to the rendered input component. */
  inputProps?: Record<string, any>;
  /** Custom label content. Falls back to the schema field name when omitted. */
  label?: Renderable<AdditionalRenderable>;
  /** Override for the inferred field renderer key. */
  fieldType?: FieldTypes;
  /** Sort order for generated fields. Lower values render first. */
  order?: number;
  /** Wrapper component override for this field only. */
  fieldWrapper?: FieldWrapper;
  /** Integration or app-specific metadata for custom components. */
  customData?: CustomData;
}

export interface ParsedField<AdditionalRenderable = null, FieldTypes = string> {
  /** Field key from the schema object. */
  key: string;
  /** Parsed field type used to select a form component. */
  type: string;
  /** Whether the schema marks this field as required. */
  required: boolean;
  /** Default value inferred from the schema provider, when available. */
  default?: any;
  /** Description inferred from schema metadata, when available. */
  description?: Renderable;
  /** AutoForm field configuration attached through the schema provider. */
  fieldConfig?: FieldConfig<AdditionalRenderable, FieldTypes>;

  // Field-specific
  /** Enum/select choices as value-label pairs. */
  options?: [string, string][]; // [value, label] for enums
  /** Child fields for object fields, or the item schema for array fields. */
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

export type SchemaType = "zod" | "yup" | "joi";
