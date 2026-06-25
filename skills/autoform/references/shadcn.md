# shadcn/ui Integration Guide

## Table of Contents

- [Installation](#installation)
- [How It Works](#how-it-works)
- [Component Anatomy](#component-anatomy)
- [Available Registry Blocks](#available-registry-blocks)
- [Customizing Components](#customizing-components)
- [Changing Schema Provider](#changing-schema-provider)
- [Adding Custom Fields](#adding-custom-fields)
- [Complete Example](#complete-example)

---

## Installation

(Make sure you have shadcn and and tailwind initialised in your project, see `references\shadcn-tailwind-installation` for shadcn installation from scratch.)

### Step 1: Install the AutoForm registry component

```bash
# React Hook Form
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/autoform-rhf.json

# TanStack Form
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/autoform-tanstack.json
```

This copies all AutoForm components into `components/ui/autoform/` and installs registry dependencies (alert, button, calendar, card, checkbox, form, input, label, select, skeleton, switch, textarea, toggle).

### Step 2: Install peer dependencies

```bash
npm install react-hook-form @hookform/resolvers
```

### Step 3: Install a schema provider

```bash
npm install @acp-autoform/zod
# or: npm install @acp-autoform/yup
# or: npm install @acp-autoform/joi
```

> The registry installs `zod` and `@acp-autoform/react` as npm dependencies automatically.

---

## How It Works

Unlike `@acp-autoform/mui` or other npm UI packages, the shadcn integration uses the **shadcn registry** pattern. The AutoForm components are copied into your project and you own the code — you can edit, extend, and customize them freely.

The shadcn integration provides separate React Hook Form and TanStack Form entries over the corresponding `@acp-autoform/react` adapter. Each installed entry contains the small shadcn UI component map and the adapter-specific field component map directly, so users can read and edit the installed code without a factory indirection.

Import path:

```tsx
import { AutoForm } from "@/components/ui/autoform/react-hook-form";
import type { FieldTypes } from "@/components/ui/autoform/react-hook-form";
```

---

## Component Anatomy

After installation, `components/ui/autoform/` contains:

```
autoform/
├── index.ts                # Shared integration types
├── react-hook-form.tsx     # React Hook Form convenience entry
├── tanstack-form.tsx       # TanStack Form convenience entry
├── types.ts                # Shared integration types
└── components/
    ├── Form.tsx            # <form> wrapper (flex column gap-4)
    ├── FieldWrapper.tsx    # Label + error + children per field
    ├── ErrorMessage.tsx    # Alert-based error display
    ├── SubmitButton.tsx    # shadcn Button[type=submit]
    ├── StringField.tsx     # Input for strings
    ├── NumberField.tsx     # Input[type=number]
    ├── BooleanField.tsx    # Checkbox + Label
    ├── DateField.tsx       # Input[type=date]
    ├── SelectField.tsx     # shadcn Select for enums
    ├── ObjectWrapper.tsx   # Section with h3 heading
    ├── ArrayWrapper.tsx    # Array with add button
    └── ArrayElementWrapper.tsx  # Array item with remove button
```

### react-hook-form.tsx internals

```tsx
import { AutoForm as ReactHookFormAutoForm } from "@acp-autoform/react/react-hook-form";
import type {
  AutoFormUIComponents,
  AutoFormProps as BaseAutoFormProps,
  ExtendableAutoFormProps,
} from "@acp-autoform/react";

const UIComponents: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

const RHFFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;

export function AutoForm<T extends Record<string, any>>({
  uiComponents,
  formComponents,
  ...props
}: ExtendableAutoFormProps<T>) {
  return (
    <ReactHookFormAutoForm
      {...(props as BaseAutoFormProps<T>)}
      uiComponents={{ ...UIComponents, ...uiComponents }}
      formComponents={{ ...RHFFieldComponents, ...formComponents }}
    />
  );
}

export type FieldTypes = "string" | "number" | "boolean" | "date" | "select";
```

The user-provided `uiComponents` and `formComponents` are spread on top, so custom overrides merge cleanly.

---

## Available Registry Blocks

These are pre-built example blocks you can install via the shadcn CLI. Each includes full working code.

### Real-time Validation Demo

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/realtime-validation-demo.json
```

Shows real-time validation with disabled submit until all fields are valid. Uses `createFormControl({ mode: "all" })`.

### Dialog Submit Demo

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/dialog-submit-demo.json
```

Submit and reset AutoForm from dialog buttons using `useFormContext` and `createFormControl`.

### Custom Fields Demo

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/custom-fields-demo.json
```

Custom field components for sliders, color pickers, radios, dates, and file uploads.

### Ecommerce Checkout Demo

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/ecommerce-checkout-demo.json
```

Checkout form with cascading selects, conditional coupon/payment fields, and cross-field `superRefine` validation.

### Multi-step Form Demo

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/multistep-form-demo.json
```

Multi-step form with per-step validation, breadcrumb navigation, and collected submission.

### Nested AutoForm Demo

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/nested-autoform-demo.json
```

Nested AutoForm inside a Dialog as a custom field component.

### Interactive Schema Demo

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/interactive-schema-demo.json
```

Dynamic form builder with Monaco Editor + AutoForm for real-time form generation from Zod schema strings. **Warning**: uses `eval()` — not for production.

---

## Customizing Components

Since the shadcn components are in your project, you can edit them directly. Common customizations:

### Change FieldWrapper layout

Edit `components/ui/autoform/components/FieldWrapper.tsx` to change label placement, spacing, or error styling.

### Add a new field component

1. Create `components/ui/autoform/components/TextareaField.tsx`:

```tsx
import { Textarea } from "@/components/ui/textarea";
import { AutoFormFieldProps } from "@acp-autoform/react";
import { useController } from "react-hook-form";

export const TextareaField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { field } = useController({ name: id });
  const { value, ...rest } = field;
  return (
    <Textarea
      id={id}
      className={error ? "border-destructive" : ""}
      value={value ?? ""}
      {...inputProps}
      {...rest}
    />
  );
};
```

Add the new field to the adapter entry you use. For React Hook Form, edit `components/ui/autoform/react-hook-form.tsx`; for TanStack Form, edit `components/ui/autoform/tanstack-form.tsx`.

2. Register it in `react-hook-form.tsx`:

```tsx
const RHFFieldComponents = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
  textarea: TextareaField, // ← add here
} as const;
```

3. Use `fieldConfig` in your schema to route a field:

```tsx
bio: z.string().check(
  fieldConfig<React.ReactNode, FieldTypes>({ fieldType: "textarea" })
),
```

Or, instead of editing the source AutoForm, pass it as a prop:

```tsx
<AutoForm
  formComponents={{ textarea: TextareaField }}
  schema={schemaProvider}
/>
```

---

## Changing Schema Provider

The shadcn registry defaults to Zod. To use Yup or Joi instead:

1. Install the schema provider:

```bash
npm install @acp-autoform/yup yup
# or
npm install @acp-autoform/joi joi
```

2. In your form component, import from the correct schema package:

```tsx
import { YupProvider, fieldConfig } from "@acp-autoform/yup";
import { object, string, number } from "yup";

const schema = object({ name: string().required(), age: number() });
const schemaProvider = new YupProvider(schema);

<AutoForm schema={schemaProvider} withSubmit />;
```

---

## Complete Example

```tsx
"use client";
import * as z from "zod";
import { ZodProvider, fieldConfig } from "@acp-autoform/zod";
import { AutoForm } from "@/components/ui/autoform/react-hook-form";
import type { FieldTypes } from "@/components/ui/autoform/react-hook-form";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  age: z.coerce.number().min(18, "Must be 18+").optional(),
  role: z.enum(["admin", "editor", "viewer"]),
  bio: z
    .string()
    .optional()
    .check(
      fieldConfig<React.ReactNode, FieldTypes>({
        inputProps: { placeholder: "Tell us about yourself..." },
      }),
    ),
  newsletter: z.boolean().describe("Subscribe to newsletter"),
});

const schemaProvider = new ZodProvider(userSchema);

export default function UserForm() {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => {
        console.log("Validated data:", data);
      }}
      withSubmit
    />
  );
}
```
