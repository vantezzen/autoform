# Customization Reference

AutoForm is highly customizable. You can override everything from the structural UI wrappers (like how a field label is rendered) to the specific input components (like using a custom date picker).

## 1. Schema-Level Customization (`fieldConfig`)

The primary way to customize individual fields is by attaching `fieldConfig` to your schema. Import `fieldConfig` from your schema package (e.g., `@dual-autoform/zod`).

```tsx
import { fieldConfig } from "@dual-autoform/zod";
import type { FieldTypes } from "@dual-autoform/mui/react-hook-form"; // Optional: import from your UI adapter for TS

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

Autoform renders default input components for common schema types see `references/schema.md` lines `11-155 for Zod`, `158-196 for Yup`, `199-235 for Joi` to learn more.

### fieldConfig Properties

| Option                | Type        | Purpose                                        |
| --------------------- | ----------- | ---------------------------------------------- |
| `label`               | `string`    | Override the auto-generated label              |
| `description`         | `ReactNode` | Helper text below the field                    |
| `inputProps`          | `object`    | Props spread onto the input element            |
| `fieldType`           | `string`    | Route to a custom `formComponents` entry       |
| `order`               | `number`    | Display order (lower = earlier, default 0)     |
| `fieldWrapper`        | `Component` | Per-field wrapper override                     |
| `objectWrapper`       | `Component` | Per-object-field wrapper override              |
| `arrayWrapper`        | `Component` | Per-array-field wrapper override               |
| `arrayElementWrapper` | `Component` | Per-array-item wrapper override                |
| `customData`          | `object`    | Arbitrary data accessible in custom components |

### Customization routing

- `inputProps`: same input, different props such as placeholder, disabled, rows, min/max, className, or aria props.
- `fieldType` + `formComponents`: replace the actual value editor for any field type, including object and array fields. Use this for picker modals, search selectors, uploads, rich editors, map pickers, or multi-card selectors.
- `fieldWrapper`: keep the field component, change the shell around one field, such as label/error layout, conditional visibility, badges, help text, or spacing.
- `objectWrapper`: keep generated child fields, change the shell around an object group, such as fieldset, card, accordion, section heading, or grouped layout.
- `arrayWrapper`: keep generated array item fields, change the shell around the whole array, such as add button, empty state, toolbar, array-level label/error, or list layout.
- `arrayElementWrapper`: keep generated item fields, change the shell around each array item, such as remove button, item card, numbering, accordion item, or item actions.
- `uiComponents`: apply structural UI overrides globally.
- `fieldConfig`: apply wrapper, input, field type, or metadata overrides to one schema field. Field config overrides win over `uiComponents` passed to AutoForm.

Rule of thumb: use `fieldType` and custom components via `formComponents` when you want to replace how a value is edited; use wrappers when AutoForm should keep editing the value but you want to change the surrounding UI.

## 2. Component-Level Customization

AutoForm divides its components into two categories:

1. **UI Components (`uiComponents`)**: Structural form elements.
   - `Form`: The outer `<form>` element.
   - `FieldWrapper`: Wraps every field, rendering the label and error.
   - `ObjectWrapper`: Wraps nested objects (e.g., rendering a fieldset or accordion).
   - `ArrayWrapper`: Wraps an array field and its "Add Item" button.
   - `ArrayElementWrapper`: Wraps an individual item within an array, including the "Remove" button.
   - `SubmitButton`: The default submit button (rendered if `withSubmit` is true).
   - `ErrorMessage`: Renders the error message when a field is not found for mapping.

2. **Form Components (`formComponents`)**: The actual input elements (e.g; input, select, checkbox).

### Overriding UI Components

Override these globally with `uiComponents` prop to `<AutoForm>`,
Or override `FieldWrapper`, `ObjectWrapper`, `ArrayWrapper`, and `ArrayElementWrapper` per field with `fieldConfig`.

Import shared custom component and wrapper types from the React root:

```tsx
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
  ObjectWrapperProps,
  ArrayWrapperProps,
  ArrayElementWrapperProps,
  AutoFormUIComponents,
} from "@dual-autoform/react";
```

```tsx
import type { FieldWrapperProps } from "@dual-autoform/react";

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

### Form Components: Creating Custom Inputs

To create a custom input or value editor (like a slider, color picker, rich text editor, modal selector, async search picker, upload field, or multi-card selector), create a component that receives `AutoFormFieldProps` and register it in `formComponents`.
Custom components can replace scalar, object, or array field editors, but they must write values in the `onChange` handler that satisfy the field schema.

**Important Rule**: Most custom form components should only render the input itself. Do not render the label or error message because `FieldWrapper` handles that automatically. If a custom component replaces an entire object or array editor, it owns more UI, but it still must write schema-compatible values in the `onChange` handler.

The registration and schema routing are adapter-independent:

```tsx
const schema = z.object({
  volume: z.coerce.number().check(fieldConfig({ fieldType: "slider" })),
});

<AutoForm schema={schemaProvider} formComponents={{ slider: SliderField }} />;
```

Read the selected adapter reference to learn, how to write custom components:

- React Hook Form: `references/react-hook-form.md`
- TanStack Form: `references/tanstack-form.md`

## 3. Form Element Customization

To pass props directly to the underlying `<form>` HTML element (like classes, ids, or native event handlers), use the `formProps` prop on `AutoForm`.

```tsx
<AutoForm
  schema={schemaProvider}
  formProps={{
    className: "my-custom-form-class space-y-4",
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

## 4. Submit Button

Use `withSubmit` to render AutoForm's default submit button:

```tsx
<AutoForm schema={schemaProvider} onSubmit={handleSubmit} withSubmit />
```

Render a custom submit button as a child when you need custom markup:

```tsx
<AutoForm schema={schemaProvider} onSubmit={handleSubmit}>
  <button type="submit">Create Account</button>
</AutoForm>
```

Use `formProps.id` with the HTML `form` attribute when the submit button is outside the form element:

```tsx
<AutoForm
  schema={schemaProvider}
  onSubmit={handleSubmit}
  formProps={{ id: "my-form" }}
/>
<button type="submit" form="my-form">
  Submit
</button>
```

For external submit/reset through form APIs, read the selected adapter reference.

> AutoForm replaces empty values such as `""` and `null` with `undefined` before validation. This keeps optional schema fields from failing just because an empty input submitted `""`. Disable this cleanup with <AutoForm schema={schemaProvider} formProps={{ removeEmptyValue: false }} />
