import { SchemaProvider } from "@acp-autoform/core";
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
      '[aria-invalid="true"]'
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
      'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (input) {
      input.focus();
    } else {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 0);
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

/**
 * Creates a TanStack Form validator from an AutoForm schema provider.
 * TanStack natively supports Standard Schema (Zod ≥3.24, Yup ≥1.7, Valibot, ArkType).
 * Returns the raw schema object to pass to validators.onChange — no adapter package needed.
 */
export function createSchemaValidator(
  schema: SchemaProvider<any>,
): object | undefined {
  return schema.getSchema?.() ?? undefined;
}
