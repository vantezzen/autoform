---
title: Customization
description: The customization of the components is done by providing a `fieldConfig` to your schema fields. This allows you to customize the rendering of the field, add additional props, and more.
---

With zod, you can use the `superRefine` method to add a `fieldConfig` to your schema field. For more information, see the [Zod documentation](/docs/schema-providers/zod).

With yup, you can use the `transform` method to add a `fieldConfig` to your schema field. For more information, see the [Yup documentation](/docs/schema-providers/yup).

With joi, you can use the `meta` method to add a `fieldConfig` to your schema field. For more information, see the [Joi documentation](/docs/schema-providers/joi).

In these examples, we will use Zod.

Depending on the validation library you are using, import `buildZodFieldConfig`, `buildYupFieldConfig`, or `buildJoiFieldConfig` from `@autoform/react` and customize it.

```tsx
import * as z from "zod";
import { buildZodFieldConfig } from "@autoform/react";
import { FieldTypes } from "@autoform/mui";

const fieldConfig = buildZodFieldConfig<
  FieldTypes, // You should provide the "FieldTypes" type from the UI library you use
  {
    isImportant?: boolean; // You can add custom props here
  }
>();

const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      label: "Username",
      inputProps: {
        placeholder: "Enter your username",
      },
      customData: {
        isImportant: true, // You can add custom data here
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

### Custom field types

You can also add your own custom field types. To do this, you need to extend the `formComponents` prop of your AutoForm component and add your custom field type.

```tsx
<AutoForm
  formComponents={{
    custom: ({ field, label, inputProps }: AutoFormFieldProps) => {
      return (
        <div>
          <input
            type="text"
            className="bg-red-400 rounded-lg p-4"
            // You should always pass the "inputProps" to the input component
            // This includes the handlers for "onChange", "onBlur", etc.
            {...inputProps}
          />
        </div>
      );
    },
  }}
/>;

const fieldConfig = buildZodFieldConfig<
  FieldTypes | "custom",
  {
    isImportant?: boolean;
  }
>();

const schema = z.object({
  username: z.string().superRefine(
    fieldConfig({
      fieldType: "custom",
    })
  ),
});
```

Please note that this will still render the default `FieldWrapper` around your input field, which contains the label and error message. If you want to customize this, you can use the `fieldWrapper` property ([see below](#custom-field-wrapper)).

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

## Custom field wrapper

You can use the `fieldWrapper` property to wrap the field in a custom component. This is useful if you want to add additional elements to the field.

The `fieldWrapper` is responsible for rendering the field label and error, so when you use a custom `fieldWrapper`, you need to handle these yourself. You can take a look at the `FieldWrapperProps` type to see what props are passed to the `fieldWrapper`.

```tsx
const schema = z.object({
  email: z.string().superRefine(
    fieldConfig({
      fieldWrapper: (props: FieldWrapperProps) => {
        return (
          <>
            {props.children}
            <p className="text-muted-foreground text-sm">
              Don't worry, we won't share your email with anyone!
            </p>
          </>
        );
      },
    })
  ),
});
```

## Override UI components

You can also override the default UI components with custom components. This allows you to customize the look and feel of the form.

```tsx
<AutoForm
  uiComponents={{
    FieldWrapper: ({ children, label, error }) => {
      return (
        <div>
          <label>{label}</label>
          {children}
          {error}
        </div>
      );
    },
  }}
/>
```

## Form element customization

In addition to overriding UI components, you can also customize the form element itself using the `formProps` prop:

```tsx
<AutoForm
  schema={schemaProvider}
  onSubmit={handleSubmit}
  formProps={{
    className: "my-custom-form",
    "data-testid": "user-form",
    noValidate: true,
    onTouchStart: (e) => {
      console.log("onTouchStart", e);
    },
  }}
/>
```

This allows you to add custom classes, data attributes, or other properties directly to the form element.
