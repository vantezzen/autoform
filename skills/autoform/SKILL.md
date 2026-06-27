---
name: autoform
description: How to use the @dual-autoform/* packages with React Hook Form or TanStack Form to automatically generate React forms from Zod, Yup, or Joi schemas with any UI library (shadcn/ui, MUI, Mantine, Ant Design, Chakra UI). Use this skill whenever the user wants to create a form from a schema, select a form adapter, build forms with custom field components, set up fieldConfig for label/description/inputProps/fieldType, create multi-step forms, nest AutoForm instances, customize AutoForm UI components, or customize field/object/array wrappers. Trigger this skill even when the user just mentions "autoform", "auto form", "auto-form", "dual-autoform", "schema-driven form", or "generate form from schema".
---

# @dual-autoform — Schema-Driven Form Generation

AutoForm automatically renders React forms from your existing Zod, Yup, or Joi schema. You pick the UI library, you pick the schema library, and AutoForm wires them together, no manual field binding.

## Architecture (read this first)

AutoForm is a **four-layer** system. Understanding the layers prevents import errors:

```
@dual-autoform/core          ← types & utilities (you rarely import from here)
    ↓
@dual-autoform/zod|yup|joi   ← schema provider (parse + validate + fieldConfig)
    ↓
@dual-autoform/react          ← shared React contracts + adapter implementations
    ├── /react-hook-form     ← React Hook Form implementation
    └── /tanstack-form       ← TanStack Form implementation
    ↓
@dual-autoform/mui|mantine|ant|chakra  ← UI-library wrapper (pre-wired components)
        OR
shadcn registry (copy-paste components via CLI)
```

**Key rule**: Import `AutoForm` from the selected adapter subpath of the **UI package**, for example `@dual-autoform/mui/react-hook-form` or `@dual-autoform/mui/tanstack-form`. For shadcn, use `components/ui/autoform/react-hook-form` or `components/ui/autoform/tanstack-form`. Import `fieldConfig` and `SchemaProvider` from the **schema package** (for example `@dual-autoform/zod`). Import shared types like `AutoFormFieldProps`, `FieldWrapperProps`, `ObjectWrapperProps`, `ArrayWrapperProps`, and `ArrayElementWrapperProps` from `@dual-autoform/react`. Custom fields should use the selected form library hook: `useController` for React Hook Form, or `useFieldContext` for TanStack Form.

---

## Quick Start (minimal working form)

### 1. Install dependencies

Choose one form engine. The examples in this skill use React Hook Form unless they explicitly say TanStack Form.

```bash
# React Hook Form
npm install react-hook-form @hookform/resolvers

# TanStack Form
npm install @tanstack/react-form
```

Then install one **UI package** and one **schema package**. See the installation section below for your specific combination.

## Installation by UI Library

Read `references/installation.md` for the full installation matrix. The summary:

### shadcn/ui (registry-based, no npm package)

(Make sure you have shadcn/ui and Tailwind initialized in your project, see `references\shadcn-tailwind-installation` for shadcn installation from scratch.)

```bash
# React Hook Form
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/autoform-rhf.json

# TanStack Form
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/autoform-tanstack.json
```

Then install a schema provider:

```bash
npm install @dual-autoform/zod   # or @dual-autoform/yup or @dual-autoform/joi
```

Import from local components:

```tsx
import { AutoForm } from "@/components/ui/autoform/react-hook-form";
// TanStack: @/components/ui/autoform/tanstack-form
```

### npm-based UI packages (MUI, Mantine, Ant, Chakra)

```bash
# MUI
npm install @dual-autoform/mui @mui/material@^6 @emotion/react@^11 @emotion/styled@^11

# Mantine
npm install @dual-autoform/mantine @mantine/core@^7 @mantine/dates@^7

# Ant Design
npm install @dual-autoform/ant antd@^5

# Chakra UI
npm install @dual-autoform/chakra @chakra-ui/react@^3.8 @emotion/react@^11.14
```

---

### 2. Create schema + render form

```tsx
"use client"; // required in Next.js App Router
import * as z from "zod";
import { ZodProvider } from "@dual-autoform/zod";
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
// TanStack: @dual-autoform/mui/tanstack-form

const schema = z.object({
  name: z.string(),
  age: z.coerce.number(), // use coerce for numbers
  birthday: z.date(),
  email: z.string().email(),
});
const schemaProvider = new ZodProvider(schema);

export default function MyForm() {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => console.log(data)}
      withSubmit
    />
  );
}
```

> **Next.js / RSC**: AutoForm must be in a `"use client"` component due to schema serialization.

## AutoForm Props Reference

| Prop             | Type                          | Description                                                               |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `schema`         | `SchemaProvider`              | **Required.** A provider instance (ZodProvider, YupProvider, JoiProvider) |
| `onSubmit`       | `(data, form, event) => void` | Called with validated data on successful submission                       |
| `withSubmit`     | `boolean`                     | Adds a default submit button                                              |
| `defaultValues`  | `object`                      | Initial form values (user can clear them)                                 |
| `values`         | `object`                      | Controlled values — form reacts to external state changes                 |
| `formControl`    | `FormControl`                 | External form control from `createFormControl()`                          |
| `onFormInit`     | `(form) => void`              | **Deprecated.** Use `formControl` instead                                 |
| `formComponents` | `Record<string, Component>`   | Map field types to custom input components                                |
| `uiComponents`   | `object`                      | Override structural UI pieces (Form, FieldWrapper, ObjectWrapper, etc.)   |
| `formProps`      | `object`                      | Extra props for the `<form>` element                                      |
| `children`       | `ReactNode`                   | Rendered below the form fields                                            |

---

## Schema Providers — How to Define Your Schema

Each schema library has its own provider class and its own `fieldConfig` attachment method. Read `references/schema-providers.md` for full details. Summary:

| Library                  | Provider                  | fieldConfig attachment             | Requires              |
| ------------------------ | ------------------------- | ---------------------------------- | --------------------- |
| **Zod v4**, **Zod Mini** | `new ZodProvider(schema)` | `.check(fieldConfig({...}))`       | `zod ^3.25.0 \|\| ^4` |
| **Zod v3**               | `new ZodProvider(schema)` | `.superRefine(fieldConfig({...}))` | `zod ^3.25.0`         |
| **Yup**                  | `new YupProvider(schema)` | `.transform(fieldConfig({...}))`   | `yup`                 |
| **Joi**                  | `new JoiProvider(schema)` | `.meta(fieldConfig({...}))`        | `joi`                 |

### Critical schema rules

- **Numbers**: Always use `z.coerce.number()` (Zod), not `z.number()` — HTML inputs return strings.
- **Dates**: Use `z.date()` for Zod date fields.
- **Enums/Select**: Use `z.enum([...])` or `z.nativeEnum(...)` for Zod, `mixed().oneOf(...)` for Yup, `Joi.any().valid(...)` for Joi.
- **Arrays**: Supported as fields (array cannot be a root schema).
- **Optional**: Use `.optional()` for Zod. Skip `.required()` for Yup/Joi.
- **Default**: `.default(value)` is a validation fallback. For pre-filled values the user can clear, use the `defaultValues` prop instead.

---

## fieldConfig — Customizing Fields

`fieldConfig` is how you customize labels, descriptions, input props, field types, wrappers, and per-field metadata **inside the schema**. Import it from your schema package.

```tsx
import { fieldConfig } from "@dual-autoform/zod";
import { FieldTypes } from "@dual-autoform/mui"; // or your UI package

const schema = z.object({
  username: z
    .string({
      error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  password: z
    .string({
      error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password")
    .check(
      fieldConfig({
        description: "Use a strong password.",
        inputProps: { type: "password", placeholder: "••••••••" },
      }),
    ),
  bio: z.string().check(
    fieldConfig<React.ReactNode, FieldTypes>({
      fieldType: "textarea", // route to a custom form component
    }),
  ),
  priority: z.string().check(
    fieldConfig({
      order: -1, // negative = show first
    }),
  ),
  color: z.enum(["red", "green", "blue"]),
  // You can use sub-objects that will be rendered with their own title
  guestDetails: z.object({
    name: z.string(),
    age: z.coerce.number(),
  }),
});
```

### Customization routing

- `inputProps`: same input, different props such as placeholder, disabled, rows, min/max, className, or aria props.
- `fieldType` + `formComponents`: replace the actual value editor for any field type, including object and array fields. Use this for picker modals, search selectors, uploads, rich editors, map pickers, or multi-card selectors. The custom component can render anything, but it must write a value shape that matches the schema.
- `fieldWrapper`: keep the field component, change the shell around one field, such as label/error layout, conditional visibility, badges, help text, or spacing.
- `objectWrapper`: keep generated child fields, change the shell around an object group, such as fieldset, card, accordion, section heading, or grouped layout.
- `arrayWrapper`: keep generated array item fields, change the shell around the whole array, such as add button, empty state, toolbar, array-level label/error, or list layout.
- `arrayElementWrapper`: keep generated item fields, change the shell around each array item, such as remove button, item card, numbering, accordion item, or item actions.
- `uiComponents`: apply structural UI overrides globally.
- `fieldConfig`: apply wrapper, input, field type, or metadata overrides to one schema field. Field config overrides win over `uiComponents` passed to AutoForm.

Rule of thumb: use `fieldType` and custom components when you want to replace how a value is edited; use wrappers when AutoForm should keep editing the value but you want to change the surrounding UI.

### Available fieldConfig options

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

---

## Custom Field Components

Register custom value editors via `formComponents` and route fields to them with `fieldConfig({ fieldType: "..." })`.

Custom field components can replace the editor for scalar, object, or array fields. This is the right choice when wrappers are not enough, for example a modal selector, async search picker, file uploader, or multi-card selector for an array field. The component can render anything internally, but it must write the exact value shape expected by the schema in the onChange handler.

```tsx
// 1. Create the component — use useController hook from react-hook-form for RHF binding
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@dual-autoform/react";

function SliderField({ id, inputProps }: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  return (
    <input id={id} type="range" min={0} max={100} {...inputProps} {...field} />
  );
}

// 2. Register it on AutoForm
<AutoForm schema={schemaProvider} formComponents={{ slider: SliderField }} />;

// 3. Route a schema field to it
const schema = z.object({
  volume: z.coerce.number().check(
    fieldConfig<React.ReactNode, FieldTypes | "slider">({
      fieldType: "slider",
    }),
  ),
});
```

**Important**:

- Most form components should not render labels or errors because `FieldWrapper` handles those. If you dont want FieldWrapper you can override it with a wrapper that only returns `children` .
- If a custom component replaces an entire object or array editor, it may own more UI, but it still must write schema-compatible values through React Hook Form.

---

## Overriding UI Components

The full set of overridable UI components:

- `Form` — the `<form>` element
- `FieldWrapper` — wraps each field with label + error
- `ErrorMessage` — renders validation errors
- `SubmitButton` — the submit button
- `ObjectWrapper` — wraps sub-object field groups
- `ArrayWrapper` — wraps array fields with add-item button
- `ArrayElementWrapper` — wraps each array item with remove button

Override structural components globally via `uiComponents`. Override `FieldWrapper`, `ObjectWrapper`, `ArrayWrapper`, and `ArrayElementWrapper` per field via `fieldConfig`. Use wrappers only when AutoForm should still render the field contents; use `fieldType` when replacing the value editor itself.

```tsx
<AutoForm
  uiComponents={{
    FieldWrapper: CustomFieldWrapper,
    ErrorMessage: ({ error }) => <span className="text-red-500">{error}</span>,
    SubmitButton: ({ children }) => <button className="btn">{children}</button>,
  }}
/>
```

---

## Form Control — Accessing Form State

Read `references/form-control.md` for detailed patterns. Summary:

### Inside AutoForm (children)

```tsx
import { useFormContext } from "react-hook-form";

function CustomSubmitButton() {
  const {
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useFormContext();
  return (
    <button type="submit" disabled={!isValid}>
      Submit
    </button>
  );
}

<AutoForm schema={sp}>
  <CustomSubmitButton />
</AutoForm>;
```

### Outside AutoForm (external control)

```tsx
import { createFormControl } from "react-hook-form"; // requires RHF >= 7.55.0

const { formControl, handleSubmit, reset } = React.useMemo(
  () => createFormControl(), []
);

<AutoForm formControl={formControl} schema={sp} />
<button onClick={handleSubmit((data) => console.log(data))}>Submit</button>
<button onClick={() => reset()}>Reset</button>
```

---

## shadcn/ui Integration — Detailed Guide

Read `references/shadcn.md` for the complete shadcn-specific guide including:

- Registry CLI installation
- Available example blocks (with installation via `npx shadcn@latest add <url>`)
- How the shadcn AutoForm wraps `@dual-autoform/react`
- Customizing the shadcn field components

### Quick shadcn registry commands

```bash
# Install AutoForm component (React Hook Form)
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/autoform-rhf.json

# Install AutoForm component (TanStack Form)
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/autoform-tanstack.json

# Install example blocks
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/realtime-validation-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/dialog-submit-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/custom-fields-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/ecommerce-checkout-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/multistep-form-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/nested-autoform-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/tanstack-form-integration/packages/shadcn/registry/interactive-schema-demo.json
```

---

## Common Patterns

### Multi-step form

Use a separate schema per step, validate with `trigger()`, collect values with `getValues()`.

### Nested AutoForm

Create a custom field component that renders a second `<AutoForm>`. On inner submit, pass the value back via `onChange`.

### Custom object/array editor

When customization to object or array wrapper is not enough for your usecase eg: custom value editor, such as a modal picker or async multi-select. Then use `fieldType` + `formComponents`. The custom component must write the exact object/array shape expected by the schema.

### Real-time validation

Pass `createFormControl({ mode: "all" })` and check `isValid` from `useFormContext`.

### External submit/reset (e.g. Dialog buttons)

Either use `useFormContext` inside AutoForm children, or `createFormControl` outside.

### Dependent/conditional fields

Use `useWatch` + `useFormContext` inside custom field components or wrappers. Use `superRefine` for cross-field validation.

---

## Common Mistakes to Avoid

1. **Importing `AutoForm` from a package root** — select `/react-hook-form` or `/tanstack-form` from the UI integration instead.
2. **Missing engine peer dependencies** — install `react-hook-form` plus `@hookform/resolvers`, or install `@tanstack/react-form`.
3. **Not wrapping with `"use client"`** in Next.js App Router.
4. **Rendering label/error in custom form components** — `FieldWrapper` already handles this.
5. **Using `.superRefine(fieldConfig(...))` with Zod v4** — use `.check(fieldConfig(...))` instead.
6. **Arrays as root schema** — arrays must be fields inside an object schema.
7. **Using wrappers to replace the value editor** — use `fieldType` + `formComponents` when the component must own the field value.
8. **Forgetting Zod version ≥ 3.25.0** for `@dual-autoform/zod`.

---

## Reference Files

For deeper details, read these reference files in the `references/` directory:

- `references/installation.md` — Full installation matrix for every UI + schema combination
- `references/schema-providers.md` — Complete Zod, Yup, and Joi schema configuration (labels, enums, arrays, sub-objects, fieldConfig)
- `references/shadcn.md` — shadcn/ui registry integration, CLI commands, component anatomy, and all available example blocks
- `references/shadcn-tailwind-installation.md` — shadcn/ui and tailwind installation from scratch
- `references/form-control.md` — All patterns for accessing form data (onSubmit, useFormContext, createFormControl)
- `references/custom-integration.md` — Building a custom UI integration from scratch
- `references/customization.md` — fieldConfig, custom fields, UI component overrides, form element customization
