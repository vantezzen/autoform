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
@dual-autoform/react         ← shared React contracts + adapter implementations
    ├── /react-hook-form     ← React Hook Form implementation
    └── /tanstack-form       ← TanStack Form implementation
    ↓
@dual-autoform/mui|mantine|ant|chakra  ← UI-library wrapper (pre-wired components)
        OR
shadcn registry (copy-paste components via CLI)
```

---

## Installation

Pick one option from each domain and read only the relevant lines given:

### Form library

| Option          | More to know                             |
| --------------- | ---------------------------------------- |
| React Hook Form | `references/installation.md` lines 7-32  |
| TanStack Form   | `references/installation.md` lines 34-59 |

### Schema library

| Option | More to know                               |
| ------ | ------------------------------------------ |
| Zod    | `references/installation.md` lines 178-188 |
| Yup    | `references/installation.md` lines 190-198 |
| Joi    | `references/installation.md` lines 200-208 |

### UI library

| Option            | More to know                               |
| ----------------- | ------------------------------------------ |
| shadcn/ui         | `references/installation.md` lines 63-84   |
| Material UI (MUI) | `references/installation.md` lines 86-106  |
| Mantine           | `references/installation.md` lines 108-128 |
| Ant Design        | `references/installation.md` lines 130-150 |
| Chakra UI         | `references/installation.md` lines 152-172 |

---

## Quick Start (minimal working form)

Create schema + render form

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

---

## Architecture Flow

Use this mental model when wiring custom components or wrappers.

```text
[SchemaProvider: Zod/Yup/Joi]
        |
        v
[AutoForm: initializes form, validation]
        |
        v
[AutoFormField: internal field router]
        |
        v
[FieldWrapper: label + description + errors]
        |
        v
     [Field]
        |
        +--> [input field]  -> default / custom "form component"
        +--> [object field] -> [ObjectWrapper]
        +--> [array field]  -> [ArrayWrapper] -> [ArrayElementWrapper]
```

following sections cover each of these layers.

---

## Schema Providers

| Library                  | Provider                  | Requires      |
| ------------------------ | ------------------------- | ------------- |
| **Zod v4**, **Zod Mini** | `new ZodProvider(schema)` | `zod ^4`      |
| **Zod v3**               | `new ZodProvider(schema)` | `zod ^3.25.0` |
| **Yup**                  | `new YupProvider(schema)` | `yup`         |
| **Joi**                  | `new JoiProvider(schema)` | `joi`         |

Autoform renders default input components for common schema types see `references/schema.md` lines `11-154 for Zod`, `158-195 for Yup`, `199-235 for Joi` to learn more.

### Critical schema rules

- **Numbers**: Always use `z.coerce.number()` (Zod), not `z.number()` — HTML inputs return strings.
- **Dates**: Use `z.date()` for Zod date fields.
- **Enums/Select**: Use `z.enum([...])` or `z.nativeEnum(...)` for Zod, `mixed().oneOf(...)` for Yup, `Joi.any().valid(...)` for Joi.
- **Arrays**: Supported and valid as fields (array cannot be a root schema).
- **Optional**: Use `.optional()` for Zod. Skip `.required()` for Yup/Joi.
- **Default**: `.default(value)` is a validation fallback. If user clears the field, still the .default() value will be returned in form output data.
- **Important default rule**: For pre-filled values the user can change or clear, pass default values to `<AutoForm defaultValues={...} />`.

---

## AutoForm: props

| Prop             | Type                          | Description                                                               |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `schema`         | `SchemaProvider`              | **Required.** A provider instance (ZodProvider, YupProvider, JoiProvider) |
| `onSubmit`       | `(data, form, event) => void` | Called with validated data on successful submission                       |
| `withSubmit`     | `boolean`                     | Add a default submit button                                               |
| `defaultValues`  | `object`                      | Initial form values (user can edit/clear them)                            |
| `values`         | `object`                      | Controlled values — form reacts to external state changes                 |
| `formControl`    | adapter form control          | External form control from the selected adapter (see form adapters)       |
| `formComponents` | `Record<string, Component>`   | Map field types to custom input components                                |
| `uiComponents`   | `object`                      | Override structural UI pieces (Form, FieldWrapper, ObjectWrapper, etc.)   |
| `formProps`      | `object`                      | Extra props for the `<form>` element                                      |
| `children`       | `ReactNode`                   | Rendered below the form fields                                            |

---

## Customization

There are four ways to customize AutoForm:

1. Use `fieldConfig` on schema fields
   - To set labels, descriptions, field order, customData, field types and pass inputProps to the input component like placeholder etc.
   - To customize field level UI wrappers
   - See `references/schema.md` and `references/customization.md` (lines 5-70) to understand fieldConfig in detail.

2. Override UI wrappers:
   - Use `uiComponents` on `<AutoForm />` to override UI components globally.
     Use case: replace global structure such as `Form`, `FieldWrapper`, `ErrorMessage`, `SubmitButton`, `ObjectWrapper`, `ArrayWrapper`, or `ArrayElementWrapper`.
   - Use `fieldConfig` on a schema field to override UI wrappers for that field only.
     Use case: change one field shell, object group, array list, or array item without changing the whole form.

3. Use `formComponents` on `<AutoForm />` and select them with `fieldConfig({ fieldType: "..." })` to add custom inputs.
   Use case: replace the value editor with a slider, color picker, rich text editor, modal selector, async search picker, upload field, multi-card selector, anything you need.

4. Use `formProps` to pass extra props to `<AutoForm />` to customize the `<form>` element.
   Use case: add classes, ids, data attributes, className,styles or native form event handlers.

Read `references/customization.md` for a complete guide to all the above options.
Read the selected adapter reference for writing custom field binding code: React Hook Form custom fields use `useController`; TanStack custom fields use `useFieldContext`.

---

## Form Control - Accessing form and field level data, states and methods.

Read the reference for your selected adapter:

- React Hook Form: `references/react-hook-form.md`
- TanStack Form: `references/tanstack-form.md`

Do not mix RHF hooks with TanStack hooks in the same implementation.
`references/react-hook-form.md` and `references/tanstack-form.md` are adapter-specific. The other references apply to both form libraries unless they explicitly say otherwise.

---

## shadcn/ui Integration

Unlike other npm UI packages, the shadcn installation copies the AutoForm components into your project so you can edit and customize them.
Use the AutoForm exported by the adapter installed in your project:

```tsx
import { AutoForm } from "@/components/ui/autoform/react-hook-form";

// or
import { AutoForm } from "@/components/ui/autoform/tanstack-form";
```

- Change the core components only when you want that customization available to every AutoForm in the project. For example, edit `components/ui/autoform/components/FieldWrapper.tsx` for project-wide wrapper layout changes, or edit the installed adapter entry, `components/ui/autoform/react-hook-form.tsx` or `components/ui/autoform/tanstack-form.tsx`, to register project-wide field components.

- For a custom field used by one form, pass it to `AutoForm` with `formComponents`:

```tsx
<AutoForm
  formComponents={{ textarea: TextareaField }}
  schema={schemaProvider}
/>
```

---

## Common Patterns

Read your adapter-specific examples file for the following patterns and use cases: `references/utils/examples-react-hook-form.md` or `references/utils/examples-tanstack-form.md`.

- Real-time validation: disabled submit, can submit, live errors, valid form state, enable submit only when form state is valid
- Dialog submit/reset: dialog buttons, external submit, external reset, submit outside form, submit/reset AutoForm from buttons outside or around the form
- Custom fields: custom field, slider, color picker, date picker, file upload, radio cards, value editor, replace the field value editor with `fieldConfig({ fieldType })` + `formComponents`
- Dependent/conditional fields: cascading select, coupon, payment section, gift message, watch other fields, show/disable/reset/replace UI based on form values
- Multi-step form: wizard, multiple schemas, step validation, collect step data, split a flow into multiple schemas/forms and advance after valid step submission
- Nested AutoForm: subform in dialog, object editor, array/object custom value, render a second AutoForm inside a custom field and write its submitted value to the outer field
- Dynamic schema playground: schema text, generated form, Monaco, interactive schema, parse a schema string and render AutoForm dynamically

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
- `references/customization.md` — fieldConfig, custom fields, UI component overrides, form element customization
- `references/react-hook-form.md` - React Hook Form imports, custom fields, form control, defaults, and common mistakes
- `references/tanstack-form.md` - TanStack Form imports, custom fields, form control, defaults, and common mistakes
- `references/schema.md` — Complete Zod, Yup, and Joi schema configuration (labels, enums, arrays, sub-objects, fieldConfig)
- `references/utils/shadcn-tailwind-installation.md` — shadcn/ui and tailwind installation from scratch
- `references/utils/examples-react-hook-form.md` - React Hook Form shadcn example blocks with install commands, source links, and API-specific descriptions
- `references/utils/examples-tanstack-form.md` - TanStack Form shadcn example blocks with install commands, source links, and API-specific descriptions
- `references/utils/custom-ui-package-integration.md` — Building a custom UI package integration from scratch
- `references/utils/customizing-react-package.md` — If the public React package API does not cover your use case, then copy and customize the React adapter source in your project.
