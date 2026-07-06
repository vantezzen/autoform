import React from "react";
import { replaceEmptyValue } from "@autoform/core";
import type { SchemaProvider } from "@autoform/core";

export function createSchemaValidator<T extends Record<string, any>>(
  schema: SchemaProvider<T>,
  removeEmptyValue = true,
) {
  return ({ value }: { value: T }) => {
    const validation = schema.validateSchema(
      removeEmptyValue ? replaceEmptyValue(value) : value,
    );
    if (validation.success) return;

    return {
      fields: Object.fromEntries(
        validation.errors.map((error) => [
          formatTanStackPath(error.path.map(String)),
          error,
        ]),
      ),
    };
  };
}

export function focusFirstFieldInPath(path: string): void {
  const exact = CSS.escape(path);
  const prefix = CSS.escape(`${path}.`);
  document
    .querySelector<HTMLElement>(
      `:is(input:not([type="hidden"]),select,textarea,button,[tabindex]):not(:disabled):is([id="${exact}"],[name="${exact}"],[id^="${prefix}"],[name^="${prefix}"])`,
    )
    ?.focus();
}

export function getAppForm(form: {
  AppForm?: React.ComponentType<React.PropsWithChildren>;
}): React.ComponentType<React.PropsWithChildren> {
  const AppForm = form.AppForm;
  if (!AppForm) {
    throw new Error(
      "TanStack AutoForm formControl must be created with useAppForm " +
        "exported from @autoform/react/tanstack-form.",
    );
  }
  return AppForm;
}

/**
 * Formats an array of path segments into a TanStack Form compatible string path.
 * e.g., ["guests", "0", "name"] -> "guests[0].name"
 */
export function formatTanStackPath(path: string[]): string {
  return path.reduce((acc, part) => {
    if (!isNaN(Number(part))) {
      return `${acc}[${part}]`;
    }
    return acc ? `${acc}.${part}` : part;
  }, "");
}

export function getErrorMessage(fieldApi: any): string | undefined {
  const error = fieldApi.state.meta.errors?.[0];
  if (!error) return undefined;
  if (typeof error === "string") return error;
  if (typeof error.message === "string") return error.message;
  return String(error);
}
