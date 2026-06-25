"use client";

import { AutoForm as ReactHookFormAutoForm } from "@acp-autoform/react/react-hook-form";
import { createAutoForm } from "./AutoForm";

import { StringField } from "./components/rhf/StringField";
import { NumberField } from "./components/rhf/NumberField";
import { BooleanField } from "./components/rhf/BooleanField";
import { DateField } from "./components/rhf/DateField";
import { SelectField } from "./components/rhf/SelectField";

const RHFFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;

export const AutoForm = createAutoForm(ReactHookFormAutoForm, RHFFieldComponents);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
