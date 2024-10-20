# Customization

The customization of the components is done by providing a `fieldConfig` to your schema fields. This allows you to customize the rendering of the field, add additional props, and more.

With zod, you can use the `superRefine` method to add a `fieldConfig` to your schema field. For more information, see the [Zod documentation](/docs/schema/zod).

With yup, you can use the `transform` method to add a `fieldConfig` to your schema field. For more information, see the [Yup documentation](/docs/schema/yup). In these examples, we will use Zod.

You should import `fieldConfig` from your AutoForm UI-specific package (e.g. `@autoform/mui`) so it will be type-safe for your specific UI. If you use a custom UI, you can import `fieldConfig` from `@autoform/react` or `@autoform/core`.

```tsx
import * as z from "zod";
import { fieldConfig } from "@autoform/mui"; // or your UI library

const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      label: "Username",
      inputProps: {
        placeholder: "Enter your username",
      },
    })
  ),
  // ...
});
```

## Input props

You can use the `inputProps` property to pass props to the input component. You can use any props that the HTML component accepts.

```tsx
const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      inputProps: {
        type: "text",
        placeholder: "Username",
      },
    })
  ),
});
// This will be rendered as:
<input type="text" placeholder="Username" /* ... */ />;
```

## Field type

By default, AutoForm will use the Zod type to determine which input component to use. You can override this by using the `fieldType` property.

```tsx
const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      fieldType: "textarea",
    })
  ),
});
```

The list of available fields depends on the UI library you use - use the autocomplete in your IDE to see the available options.

## Description

You can use the `description` property to add a description below the field.

```tsx
const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      description:
        "Enter a unique username. This will be shown to other users.",
    })
  ),
});
```

You can use JSX in the description.

## Order

If you want to change the order of fields, use the order config. You can pass an arbitrary number where smaller numbers will be displayed first. All fields without a defined order use "0" so they appear in the same order they are defined in

```tsx
const schema = z.object({
  termsOfService: z.boolean().superRefine(
    fieldConfig({
      order: 1, // This will be displayed after other fields with order 0
    })
  ),

  username: z.string().superRefine(
    fieldConfig({
      order: -1, // This will be displayed first
    })
  ),

  email: z.string().superRefine(
    fieldConfig({
      // Without specifying an order, this will have order 0
    })
  ),
});
```
