import React from "react";

export function focusFirstFieldInPath(path: string): void {
  const exact = CSS.escape(path);
  const prefix = CSS.escape(`${path}.`);
  document
    .querySelector<HTMLElement>(
      `:is(input:not([type="hidden"]),select,textarea,button,[tabindex]):not(:disabled):is([id="${exact}"],[name="${exact}"],[id^="${prefix}"],[name^="${prefix}"])`,
    )
    ?.focus();
}

/**
 * Focus the first input element marked as invalid.
 * AutoFormField auto-injects aria-invalid into inputProps.
 */
export function focusFirstInvalidInput(): void {
  requestAnimationFrame(() =>
    document
      .querySelector<HTMLElement>(
        '[aria-invalid="true"]:is(input:not([type="hidden"]),select,textarea,button,[tabindex]):not(:disabled),[aria-invalid="true"] :is(input:not([type="hidden"]),select,textarea,button,[tabindex]):not(:disabled)',
      )
      ?.focus(),
  );
}

export function getAppForm(form: {
  AppForm?: React.ComponentType<React.PropsWithChildren>;
}): React.ComponentType<React.PropsWithChildren> {
  const AppForm = form.AppForm;
  if (!AppForm) {
    throw new Error(
      "TanStack AutoForm formControl must be created with useAppForm " +
        "exported from @acp-autoform/react/tanstack-form.",
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

/**
 * Wraps the form submit handler to stop event propagation.
 */
export const preventPropagation =
  (callback: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>) =>
  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    return callback(e);
  };
