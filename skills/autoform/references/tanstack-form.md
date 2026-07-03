# TanStack Form Adapter: Accessing form data, states and methods

## Imports

For npm UI packages:

```tsx
import { AutoForm } from "@dual-autoform/mui/tanstack-form";
```

For shadcn/ui:

```tsx
import { AutoForm } from "@/components/ui/autoform/tanstack-form";
```

Use TanStack helpers from `@dual-autoform/react/tanstack-form`:

```tsx
import {
  useAppForm,
  useFieldContext,
  useFormContext,
} from "@dual-autoform/react/tanstack-form";
```

```tsx
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
} from "@dual-autoform/react";
```

> AutoForm wraps the form with Tanstack Form's `form.AppForm` and every field with `<form.AppField name=".." ... />`. So you can use `useFieldContext`, `useFormContext` anywhere inside autoform.
> see https://raw.githubusercontent.com/tanstack/form/main/docs/framework/react/guides/form-composition.md for more information

## Which API To Use

| Need                                    | Use                                                              |
| --------------------------------------- | ---------------------------------------------------------------- |
| validated submit data                   | `onSubmit={(data, form) => ...}`                                 |
| custom input binding for one field      | `useFieldContext<T>()`                                           |
| buttons or status UI inside AutoForm    | `useFormContext()` plus `form.Subscribe` or `useStore`           |
| submit/reset/fill from outside AutoForm | `useAppForm(stableOptions)` and pass the result as `formControl` |

Start simple: use `onSubmit` first. Add `useFieldContext` only for custom field components, and add `formControl` only when something outside AutoForm needs the form instance.

## Custom Fields

TanStack custom fields use `useFieldContext` from `@dual-autoform/react/tanstack-form`. Understand `useFieldContext` properly.

```tsx
import type { AutoFormFieldProps } from "@dual-autoform/react";
import { useFieldContext } from "@dual-autoform/react/tanstack-form";

function SliderField({ id, inputProps }: AutoFormFieldProps) {
  const field = useFieldContext<number>();

  return (
    <input
      id={id}
      name={field.name}
      type="range"
      min={0}
      max={100}
      value={field.state.value ?? 0}
      onBlur={field.handleBlur}
      onChange={(event) => field.handleChange(Number(event.target.value))}
      {...inputProps}
    />
  );
}
```

Register custom fields with `formComponents`, and route schema fields with `fieldConfig({ fieldType: "..." })`.

```tsx
const schema = z.object({
  volume: z.coerce.number().check(fieldConfig({ fieldType: "slider" })),
});

export const schemaProvider = new ZodProvider(schema);

<AutoForm schema={schemaProvider} formComponents={{ slider: SliderField }} />;
```

## Inside AutoForm Children

Components rendered inside `<AutoForm>...</AutoForm>` can use `useFormContext` from `@dual-autoform/react/tanstack-form`.

```tsx
import { AutoForm } from "@dual-autoform/mui/tanstack-form";
import { useFormContext } from "@dual-autoform/react/tanstack-form";
import { useStore } from "@tanstack/react-form";

function QuickActions() {
  const form = useFormContext();
  const canSubmit = useStore(form.store, (state) => state.canSubmit);

  return (
    <div>
      <button
        type="button"
        onClick={() => form.setFieldValue("email", "dev@acme.com")}
      >
        Use sample email
      </button>
      <button type="button" onClick={() => form.reset()}>
        Reset
      </button>
      <form.Subscribe selector={(state) => state.values.email}>
        {(email) => <span>Current email: {email ?? "-"}</span>}
      </form.Subscribe>
      <button type="submit" disabled={!canSubmit}>
        Submit
      </button>
    </div>
  );
}

export default function MyForm() {
  return (
    <AutoForm schema={schemaProvider}>
      <QuickActions />
    </AutoForm>
  );
}
```

For dependent fields, prefer reading sibling field values with `form.Subscribe` or `useStore` inside the custom field or wrapper.
Use `form.Subscribe` to rerender only a small part of the UI.
Use `useStore` from `@tanstack/react-form` when the whole component should rerender from subscribed form state.
see https://tanstack.com/form/latest/docs/framework/react/guides/reactivity for more information

## External Submit Or Reset

Use `useAppForm()` when buttons live outside the AutoForm tree, for example in a dialog footer.

Do not put initial default values inside `formOptions`; pass them to `AutoForm` via `defaultValues` prop.

```tsx
import * as React from "react";
import { formOptions } from "@tanstack/react-form";
import { useAppForm } from "@dual-autoform/react/tanstack-form";

const staticOptions = formOptions({}); // optional. Keep the result of `formOptions(...)` stable.

function MyForm() {
  const form = useAppForm(staticOptions);

  return (
    <>
      <AutoForm
        schema={schemaProvider}
        formControl={form}
        defaultValues={{ username: "" }}
      />
      <button type="button" onClick={() => void form.handleSubmit()}>
        Submit
      </button>
      <button
        type="button"
        onClick={() => {
          form.setFieldValue("username", "dev@acme.com");
        }}
      >
        Same as email
      </button>
      <button type="button" onClick={() => form.reset()}>
        Reset
      </button>
    </>
  );
}
```

If options depend on props or local state, memoize them:

```tsx
const options = React.useMemo(
  () =>
    formOptions({
      validators: { onDynamic: customValidator },
    }),
  [customValidator],
);
const form = useAppForm(options);
```

## onSubmit

```tsx
<AutoForm
  schema={schemaProvider}
  onSubmit={(data, form) => {
    console.log(data); // Cleaned schema-parsed values
    console.log(form.state.values); // Original raw TanStack values
  }}
/>
```

## Defaults And Values

- Put initial values on `<AutoForm defaultValues={...} />`.
- Do not put AutoForm defaults in `formOptions({ defaultValues })`; that sends the wrong signal and can conflict with AutoForm-owned schema/default handling.
- Use `<AutoForm values={...} />` only when the form should track external state.
- Use `formProps={{ removeEmptyValue: false }}` if you need to disable AutoForm's empty-value cleanup.

## Common TanStack Mistakes

- Do not use `useController`; use `useFieldContext`.
- Do not use `useFieldContext` to read sibling fields; use `useFormContext` with `form.Subscribe` or `useStore`.
- Do not import `AutoForm` from the package root.
- Do not pass raw schemas to `AutoForm`; wrap with `new ZodProvider(schema)`, `new YupProvider(schema)`, or `new JoiProvider(schema)`.
- Keep `formOptions(...)` stable when using `useAppForm`.
