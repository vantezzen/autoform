"use client";

import { AutoForm as TanStackAutoForm } from "@acp-autoform/react/tanstack-form";
import { createAutoForm } from "./AutoForm";

import { StringField } from "./components/tanstack/StringField";
import { NumberField } from "./components/tanstack/NumberField";
import { BooleanField } from "./components/tanstack/BooleanField";
import { DateField } from "./components/tanstack/DateField";
import { SelectField } from "./components/tanstack/SelectField";

const TanStackFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;

export const AutoForm = createAutoForm(TanStackAutoForm, TanStackFieldComponents);
export type { FieldTypes } from "./AutoForm";
export type * from "./types";
