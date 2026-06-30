# Custom UI Integration Guide

If you want to build an AutoForm integration for a UI library that isn't officially supported (or you want to build a deeply customized internal integration for your company's design system as a package), you can build a custom UI package.

The `@dual-autoform/react` package exposes shared contracts and two base `<AutoForm>` implementations: `@dual-autoform/react/react-hook-form` and `@dual-autoform/react/tanstack-form`. Each implementation handles schema parsing, form-engine wiring, and recursive rendering. Your job is to provide the **UI Components** (wrappers) and **Form Components** (inputs) to style it.

## 1. Setup

Create a file for your custom AutoForm component (for example, `MyAutoForm.tsx`). Import the selected base adapter from its subpath and import shared types from `@dual-autoform/react`.

```tsx
import { AutoForm as BaseAutoForm } from "@dual-autoform/react/react-hook-form";
// For a TanStack entry, import from @dual-autoform/react/tanstack-form instead.
import {
  AutoFormUIComponents,
  AutoFormFieldComponents,
  ExtendableAutoFormProps,
  FieldValues,
} from "@dual-autoform/react";
import React from "react";
```

## 2. Implement the UI Components (Wrappers)

These components define the structure of the form. You must implement all of them.

```tsx
// 1. The Form wrapper
const Form: React.FC<{
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}> = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} className="space-y-6">
    {children}
  </form>
);

// 2. The Field Wrapper (Label + Input + Description + Error)
import { FieldWrapperProps } from "@dual-autoform/react";
const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  children,
  id,
  parsedField,
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="font-semibold text-sm">
      {label} {parsedField.required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {parsedField.fieldConfig?.description && (
      <p className="text-sm text-gray-500">
        {parsedField.fieldConfig.description}
      </p>
    )}
    {error && <span className="text-sm text-red-500">{error}</span>}
  </div>
);

// 3. Error Message (for form-level or unhandled errors)
const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <div className="p-3 bg-red-100 text-red-800 rounded">{error}</div>
);

// 4. Default Submit Button (rendered if `withSubmit` is true)
const SubmitButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
    {children}
  </button>
);

// 5. Object Wrapper (groups nested objects)
import { ObjectWrapperProps } from "@dual-autoform/react";
const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  parsedField,
  children,
}) => (
  <fieldset className="border p-4 rounded-md">
    <legend className="font-bold px-2">{label}</legend>
    <div className="space-y-4">{children}</div>
  </fieldset>
);

// 6. Array Wrapper (Wraps the list of array items and the "Add" button)
import { ArrayWrapperProps } from "@dual-autoform/react";
const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  error,
  children,
  inputProps,
  parsedField,
  onAddItem,
}) => (
  <fieldset className="border p-4 rounded-md border-dashed">
    <legend className="font-bold px-2">{label}</legend>
    <div className="space-y-4">{children}</div>
    <button
      type="button"
      onClick={onAddItem}
      className="mt-4 text-sm text-blue-600"
    >
      + Add Item
    </button>
    {error && <p className="text-red-500 mt-2">{error}</p>}
  </fieldset>
);

// 7. Array Element Wrapper (Wraps a single array item and the "Remove" button)
import { ArrayElementWrapperProps } from "@dual-autoform/react";
const ArrayElementWrapper: React.FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
  index,
}) => (
  <div className="relative border p-4 rounded bg-gray-50">
    <button
      type="button"
      onClick={onRemove}
      className="absolute top-2 right-2 text-red-500"
    >
      Remove
    </button>
    {children}
  </div>
);

// Bundle them up
const myUIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};
```

## 3. Implement the Form Components (Inputs)

These are the actual input controls. You must provide implementations for at least the basic scalar types (`string`, `number`, `boolean`, `date`). AutoForm maps schema fields to these components based on their type.

Connect your field components with the hook from the form library selected by your adapter. React Hook Form custom fields use `useController` from `react-hook-form`; TanStack custom fields use `useFieldContext` from `@dual-autoform/react/tanstack-form`. If your UI package supports both adapters, keep separate field component maps per adapter or inject an internal binding hook from the adapter entry.

```tsx
import { useController } from "react-hook-form";
import type { AutoFormFieldProps } from "@dual-autoform/react";

const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  error,
}) => {
  const { field } = useController({ name: id });
  return (
    <input
      id={id}
      type="text"
      className={`border p-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
      {...inputProps}
      {...field}
      value={field.value ?? ""}
    />
  );
};

const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  error,
}) => {
  const { field } = useController({ name: id });
  return (
    <input
      id={id}
      type="number"
      className={`border p-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
      {...inputProps}
      {...field}
      value={field.value ?? ""}
    />
  );
};

const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
  label,
}) => {
  const { field } = useController({ name: id });
  // Note: Boolean fields often need to render their own label next to the checkbox,
  // bypassing the standard FieldWrapper label placement. You might configure FieldWrapper
  // to hide the label for boolean types.
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        {...inputProps}
        {...field}
        checked={!!field.value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// Bundle them up
const myFormComponents: AutoFormFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  // date: DateField,
  // select: SelectField,
};

// Extract field types for TS support
export type MyFieldTypes = keyof typeof myFormComponents;
```

## 4. Export the Custom AutoForm Component

Create a wrapper component that passes your custom component maps to the base AutoForm component. Expose `ExtendableAutoFormProps` so users can still override your components locally if needed.

```tsx
export type MyAutoFormProps<T extends FieldValues> = ExtendableAutoFormProps<T>;

export function AutoForm<T extends Record<string, any>>({
  uiComponents,
  formComponents,
  ...props
}: MyAutoFormProps<T>) {
  return (
    <BaseAutoForm
      {...props}
      // Merge user overrides on top of your defaults
      uiComponents={{ ...myUIComponents, ...uiComponents }}
      formComponents={{ ...myFormComponents, ...formComponents }}
    />
  );
}
```

Create one public entry with the React Hook Form base or with the TanStack Form base. Reuse wrapper UI components across entries, provide adapter-specific field components or an internal binding hook.
