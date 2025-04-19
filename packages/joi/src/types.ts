import type { ObjectSchema, Schema } from "joi";

export type JoiObjectOrWrapped = ObjectSchema<any>;
export type JoiField = Schema<any>;

export type JoiEnumSchema = {
  _valids: {
    _values: Set<string>;
  };
};

export type TObjectFields = {
  key: string;
  schema: JoiField;
}[];
