---
title: Customization
description: The customization of the components is done by providing a `fieldConfig` to your schema fields. This allows you to customize the rendering of the field, add additional props, and more.
---

Import fieldConfig from your schema package [@autoform/zod](/docs/schema-providers/zod#field-configuration), [@autoform/yup](/docs/schema-providers/yup#field-configuration), [@autoform/joi](/docs/schema-providers/joi#field-configuration)

In the examples below, we use Zod.

```tsx
import * as z from "zod";
import { fieldConfig } from "@autoform/zod";
import { FieldTypes } from "@autoform/mui"; // use your UI library

const schema = z.object({
  username: z.string().check(
    fieldConfig({
      label: "Username",
      description: "Choose a unique username.",
      inputProps: {
        placeholder: "Enter your username",
      },
    }),
  ),

  password: z.string().check(
    fieldConfig({
      inputProps: {
        type: "password",
        placeholder: "Enter your password",
      },
    }),
  ),
});
```

## Input props

You can use the `inputProps` property to pass props to the input component. These are schema-configured props that AutoForm passes to the rendered field component.

```tsx
const schema = z.object({
  username: z.string().check(
    fieldConfig({
      inputProps: {
        type: "text",
        placeholder: "Username",
      },
    }),
  ),
});
// This will be rendered as:
<input type="text" placeholder="Username" /* ... */ />;
```

## Description

You can use the `description` property to add a description below the field.

```tsx
const schema = z.object({
  username: z.string().check(
    fieldConfig({
      description:
        "Enter a unique username. This will be shown to other users.",
    }),
  ),
});
```

You can use JSX in the description.

## Order

If you want to change the order of fields, use the order config. You can pass an arbitrary number where smaller numbers will be displayed first. All fields without a defined order use "0" so they appear in the same order they are defined in

```tsx
const schema = z.object({
  termsOfService: z.boolean().check(
    fieldConfig({
      order: 1, // This will be displayed after other fields with order 0
    }),
  ),

  username: z.string().check(
    fieldConfig({
      order: -1, // This will be displayed first
    }),
  ),

  email: z.string().check(
    fieldConfig({
      // Without specifying an order, this will have order 0
    }),
  ),
});
```

## Custom fields

You can customize fields in two ways: overriding existing UI components or adding entirely new form components.

### Overriding default UI components

You can override the default UI components with custom components. This allows you to customize the look and feel, either globally or for specific fields.

**Example: Creating custom FieldWrapper**

The `FieldWrapper` is responsible for rendering the field label and error, so when you use a custom wrapper, you need to handle these yourself. You can take a look at the `FieldWrapperProps` type to see what props are passed.

```tsx
// CustomFieldWrapper.tsx
import { FieldWrapperProps } from "@autoform/react"; // adjust import based on your library

export function CustomFieldWrapper({
  children,
  label,
  error,
}: FieldWrapperProps) {
  return (
    <div>
      <label>{label}</label>
      {children}
      {error}
      <p className="text-muted-foreground text-sm">Custom wrapper element</p>
    </div>
  );
}

// App.tsx
import { CustomFieldWrapper } from "./CustomFieldWrapper";

// 1. Globally override the field wrapper for all fields
<AutoForm
  uiComponents={{
    FieldWrapper: CustomFieldWrapper,
  }}
/>;

// 2. Or override it for a specific field in your schema
const schema = z.object({
  email: z.string().check(
    fieldConfig({
      fieldWrapper: CustomFieldWrapper,
    }),
  ),
});
```

### Adding new form components

You can also add your own custom field types. To do this, you need to extend the `formComponents` prop of your AutoForm component and add your custom field type.

```tsx
// CustomInput.tsx
export function CustomInput({ id, inputProps, useField }: AutoFormFieldProps) {
  const formField = useField();

  return (
    <div>
      <input
        id={id}
        type="text"
        className="bg-red-400 rounded-lg p-4"
        {...inputProps}
        {...formField}
        value={formField.value ?? ""}
      />
    </div>
  );
}

// App.tsx
import { CustomInput } from "./CustomInput";

<AutoForm
  formComponents={{
    custom: CustomInput,
  }}
/>;

// By default, AutoForm uses the Zod type to determine the input component to use.
// You can override this by using the fieldType property.
const schema = z.object({
  username: z.string().check(
    fieldConfig<React.ReactNode, FieldTypes | "custom">({
      fieldType: "custom",
    }),
  ),
});
```

`inputProps` contains the props you configured with `fieldConfig`.

For more examples on creating custom form components see [examples.](/docs/react/faq-examples)

### useField()

To connect the field to react-hook-form, call `useField()` and use the returned field props. useField() returns the same object as `useController(...).field` from rhf.

If you need the full [`useController`](https://react-hook-form.com/docs/usecontroller) API, you can import it from react-hook-form instead and use the `id` from AutoFormFieldProps as the field name:

```tsx
import { useController } from "react-hook-form";

custom: ({ id, inputProps }: AutoFormFieldProps) => {
  const { field, fieldState, formState } = useController({ name: id });

  return <input id={id} {...inputProps} {...field} />;
};
// No need to pass control to useController
// because AutoForm wraps fields with FormProvider.
```

## Form element customization

In addition to overriding UI components, you can pass additional props to the underlying form element using the formProps prop:

```tsx
<AutoForm
  schema={schemaProvider}
  onSubmit={handleSubmit}
  formProps={{
    className: "my-custom-form",
    "data-testid": "user-form",
    noValidate: true,
    onKeyDown: (e) => {
      if (e.key === "Enter") e.preventDefault();
    },
  }}
/>
```

This allows you to add custom classes, data attributes, or other properties to the form element.

## Submit Button

**1. Submit button inside AutoForm**

The simplest way is to use the `withSubmit` prop which adds a default submit button:

```tsx
<AutoForm schema={schemaProvider} onSubmit={handleSubmit} withSubmit />
```

For more control, pass a custom submit button as a child of `AutoForm`. Children are rendered below the form fields:

```tsx
<AutoForm schema={schemaProvider} onSubmit={handleSubmit}>
  <button type="submit" className="btn-primary">
    Create Account
  </button>
</AutoForm>
```

**2. Submit and reset buttons outside AutoForm**

Use [`createFormControl`](https://react-hook-form.com/docs/createFormControl) from react-hook-form to control the form externally. This lets you place submit, reset, or any other controls anywhere in your UI:

```tsx
import { createFormControl } from "react-hook-form";

export default function MyForm() {
  const schemaProvider = new ZodProvider(mySchema);

  const { formControl, handleSubmit, reset } = createFormControl();

  return (
    <div>
      <AutoForm formControl={formControl} schema={schemaProvider} />

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={handleSubmit((data) => {
            console.log("Validated data:", data);
          })}
        >
          Submit
        </button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </div>
    </div>
  );
}
```

> `createFormControl` requires react-hook-form version `7.55.0` or later.

## Custom Resolver & Value Cleanup

AutoForm automatically cleans empty values such as `""`, `null`, `[]`, `{}` before validation. This ensures optional schema fields behave exactly as expected without triggering validation errors for empty inputs. If you want to change this default validation and value cleanup, you can provide your own resolver to createFormControl:

```tsx
// example using zod resolver from @hookform/resolvers
// this overrides the default resolver and its automatic empty-value cleanup

import { zodResolver } from "@hookform/resolvers/zod";
import { createFormControl } from "react-hook-form";

const { formControl } = createFormControl({
  resolver: zodResolver(mySchema),
});

<AutoForm formControl={formControl} schema={schemaProvider} />;
```
