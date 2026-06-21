# Customization Reference

AutoForm is highly customizable. You can override everything from the structural UI wrappers (like how a field label is rendered) to the specific input components (like using a custom date picker).

## 1. Schema-Level Customization (`fieldConfig`)

The primary way to customize individual fields is by attaching `fieldConfig` to your schema. Import `fieldConfig` from your schema package (e.g., `@acp-autoform/zod`).

```tsx
import { fieldConfig } from "@acp-autoform/zod";
import { FieldTypes } from "@acp-autoform/mui"; // Optional: Import FieldTypes from your UI package for TS

const schema = z.object({
  password: z.string().check(
    fieldConfig<React.ReactNode, FieldTypes>({
      label: "Secure Password",
      description: "Must be at least 8 characters.",
      inputProps: {
        type: "password",
        placeholder: "••••••••",
        className: "my-custom-class",
      },
      order: 1, // Determines display order
    }),
  ),
});
```

### fieldConfig Properties

- `label`: Override the auto-generated label.
- `description`: Add helper text below the input. Can be a string or a React node.
- `inputProps`: Props spread directly onto the input component (e.g., `type`, `placeholder`, `disabled`, `className`).
- `order`: Controls rendering order. Lower numbers render first. Default is 0. Negative numbers render before un-ordered fields.
- `fieldType`: Override the default component mapped to this schema type. Used to route to custom components registered in `formComponents` (see below).
- `fieldWrapper`: Override the wrapper around this specific field.
- `objectWrapper`: Override the wrapper around this specific object field.
- `arrayWrapper`: Override the wrapper around this specific array field.
- `arrayElementWrapper`: Override the wrapper around each item in this specific array field.
- `customData`: Pass arbitrary data to your custom field components.

## 2. Component-Level Customization

AutoForm divides its components into two categories:

1. **UI Components (`uiComponents`)**: Structural elements like wrappers, labels, errors, and the form element itself.
2. **Form Components (`formComponents`)**: The actual input controls (e.g., the `<input>` or `<select>` element).

Use `fieldType` + `formComponents` when replacing how a value is edited. Use wrappers when AutoForm should still generate the field contents but you want to change the surrounding UI. Field-level wrappers from `fieldConfig` win over global `uiComponents`.

### Overriding UI Components

Pass the `uiComponents` prop to `<AutoForm>` to replace structural elements globally.

```tsx
import { FieldWrapperProps } from "@acp-autoform/react";

function CustomFieldWrapper({
  id,
  label,
  error,
  parsedField,
  children,
}: FieldWrapperProps) {
  return (
    <div className="my-custom-field-container">
      <label htmlFor={id} className="font-bold">
        {label} {parsedField.required && "*"}
      </label>

      {/* The actual input component goes here */}
      {children}

      {parsedField.fieldConfig?.description && (
        <p className="help-text">{parsedField.fieldConfig.description}</p>
      )}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
}

// Usage:
<AutoForm
  schema={schemaProvider}
  uiComponents={{ FieldWrapper: CustomFieldWrapper }}
/>;
```

**Available UI Components to Override:**

- `Form`: The outer `<form>` element.
- `FieldWrapper`: Wraps every field, rendering the label and error.
- `ErrorMessage`: Renders the error message (often used if you want errors displayed differently than in the FieldWrapper).
- `SubmitButton`: The default submit button (rendered if `withSubmit` is true).
- `ObjectWrapper`: Wraps nested objects (e.g., rendering a fieldset or accordion).
- `ArrayWrapper`: Wraps an array field and its "Add Item" button.
- `ArrayElementWrapper`: Wraps an individual item within an array, including the "Remove" button.

Override these globally with `uiComponents`, or override `FieldWrapper`, `ObjectWrapper`, `ArrayWrapper`, and `ArrayElementWrapper` for one field with `fieldConfig`.

### Creating and Adding Custom Form Components (Inputs)

If you need a custom input or value editor (like a slider, color picker, rich text editor, modal selector, upload field, or multi-card selector), create a component that receives `AutoFormFieldProps` and register it in `formComponents`. Custom components can replace scalar, object, or array field editors, but they must write values in the onChange that satisfy the schema.

**Important Rule**: Most custom form components should only render the input itself. Do not render the label or error message because `FieldWrapper` handles that automatically. If a custom component replaces an entire object or array editor, it may own more UI, but it still must stay connected to React Hook Form and write schema-compatible values in the onChange callback of that field.

```tsx
import { AutoFormFieldProps } from "@acp-autoform/react";
import { useController } from "react-hook-form";

// 1. Create the custom component
export function SliderField({ id, inputProps }: AutoFormFieldProps) {
  // Call useController hook to connect to react-hook-form
  const { field } = useController({ name: id });

  return (
    <div className="flex items-center gap-4">
      <input
        id={id}
        type="range"
        min={inputProps?.min || 0}
        max={inputProps?.max || 100}
        {...inputProps}
        {...field} // Spreads value, onChange, onBlur, name, ref
        value={field.value ?? 0}
      />
      <span>{field.value ?? 0}</span>
    </div>
  );
}

// 2. Register it and route a schema field to it
const schema = z.object({
  volume: z.coerce.number().check(
    fieldConfig({ fieldType: "slider" }), // Route this field to "slider"
  ),
});

<AutoForm
  schema={schemaProvider}
  formComponents={{ slider: SliderField }} // Register the component key
/>;
```

### `useController` in Custom Components

To connect your custom components to the form state, use the `useController` hook exported from `react-hook-form`.

```tsx
import { AutoFormFieldProps } from "@acp-autoform/react";
import { useController } from "react-hook-form";

export function ComplexField({ id, inputProps }: AutoFormFieldProps) {
  const { field, fieldState } = useController({ name: id });

  return (
    <input
      {...field}
      aria-invalid={fieldState.invalid}
      className={fieldState.invalid ? "border-red-500" : "border-gray-200"}
    />
  );
}
```

## 3. Form Element Customization

To pass props directly to the underlying `<form>` HTML element (like classes, ids, or native event handlers), use the `formProps` prop on `AutoForm`.

```tsx
<AutoForm
  schema={schemaProvider}
  formProps={{
    className: "my-custom-form-class",
    id: "user-settings-form",
    "data-testid": "autoform-test",
    noValidate: true, // Disable browser native HTML5 validation
    onKeyDown: (e) => {
      // Prevent form submission on Enter key
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    },
  }}
/>
```
