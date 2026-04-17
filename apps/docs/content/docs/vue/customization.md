---
title: Customization
---

## Custom field components

You can override the default field component for any field type by passing custom components via the `formComponents` prop:

```vue
<template>
  <AutoForm
    :schema="schema"
    :ui-components="uiComponents"
    :form-components="{
      string: MyCustomInput,
      number: MyCustomNumberInput,
      select: MyCustomSelect,
      // 'fallback' is used for unknown field types
      fallback: MyFallbackInput,
    }"
    @submit="onSubmit"
  />
</template>
```

### Field component props

Every field component receives the following props:

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | The field's label |
| `field` | `ParsedField` | Full field metadata from the schema |
| `value` | `any` | Current field value |
| `error` | `string \| undefined` | Validation error message |
| `id` | `string` | Unique field ID (dot-separated path) |
| `path` | `string[]` | Field path as array |
| `inputProps` | `object` | Contains `modelValue` and `onUpdate:modelValue` |

### Using inputProps for v-model

The `inputProps` object contains `modelValue` and `onUpdate:modelValue` to work with Vue's reactivity:

```ts
const MyInput = defineComponent({
  props: ["field", "value", "error", "id", "inputProps"],
  setup(props) {
    return () =>
      h("input", {
        value: props.inputProps?.modelValue ?? "",
        onInput: (e: Event) =>
          props.inputProps?.["onUpdate:modelValue"]?.(
            (e.target as HTMLInputElement).value
          ),
      });
  },
});
```

## Custom UI components

UI components control the form's structure and layout. Override any of them via the `uiComponents` prop:

| Component | Purpose | Required Props |
|-----------|---------|---------------|
| `Form` | Form wrapper | `onSubmit` (via attrs) |
| `FieldWrapper` | Wraps each field with label and error | `label`, `error`, `id`, `field` |
| `ErrorMessage` | Displays error messages | `error` |
| `SubmitButton` | Submit button | — (uses default slot) |
| `ObjectWrapper` | Wraps nested object fields | `label`, `field` |
| `ArrayWrapper` | Wraps array fields | `label`, `field`, emits `addItem` |
| `ArrayElementWrapper` | Wraps each array item | `index`, emits `remove` |

## Custom field wrapper per field

You can override the field wrapper for a specific field using `fieldConfig`:

```ts
import { fieldConfig } from "@autoform/zod";

const schema = z.object({
  name: z.string().superRefine(
    fieldConfig({
      fieldWrapper: MyCustomWrapper,
    })
  ),
});
```

## Overriding field types

Force a specific field type using `fieldConfig`:

```ts
const schema = z.object({
  bio: z.string().superRefine(
    fieldConfig({
      fieldType: "textarea",
    })
  ),
});
```

Then provide a `textarea` component in your `formComponents`.
