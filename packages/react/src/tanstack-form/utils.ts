import React from "react";

/**
 * Focus the first input element marked as invalid.
 * AutoFormField auto-injects aria-invalid into inputProps.
 */
export function focusFirstInvalidInput(): void {
  setTimeout(() => {
    // Find the first element marked as invalid natively or via our data attribute
    // Using a combined selector ensures we find the first one in document order
    const firstInvalid = document.querySelector<HTMLElement>(
      '[aria-invalid="true"]',
    );

    if (!firstInvalid) return;

    // If the element itself is directly focusable, focus it
    if (
      firstInvalid.tagName === "INPUT" ||
      firstInvalid.tagName === "SELECT" ||
      firstInvalid.tagName === "TEXTAREA" ||
      firstInvalid.tagName === "BUTTON" ||
      firstInvalid.hasAttribute("tabindex")
    ) {
      firstInvalid.focus();
      return;
    }

    // Otherwise, it's a wrapper (like MUI or Mantine), find the first focusable input inside it
    const input = firstInvalid.querySelector<HTMLElement>(
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (input) {
      input.focus();
    } else {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 50);
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
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await callback(e);
  };
