---
title: Joi
---

Basic usage:

```tsx
"use client";
import { JoiProvider, fieldConfig } from "@acp-autoform/joi";
import Joi from "joi";
import { AutoForm, FieldTypes } from "@acp-autoform/mui"; // use any UI library

// Define your form schema using Joi
const joiFormSchema = Joi.object({
  // Use the "label" method to set the label
  // You can set a default value
  name: Joi.string().required().label("Your Name").default("John Doe"),

  age: Joi.number().required().positive().integer().messages({
    "any.required":
      "We need your age to verify you're old enough to use this form",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    // You can add additional config for a field using fieldConfig
    .meta(
      fieldConfig<React.ReactNode, FieldTypes, any, { isImportant?: boolean }>({
        inputProps: {
          type: "email",
        },
        customData: {
          // You can add custom data here
          isImportant: true,
        },
      }),
    ),

  website: Joi.string().uri().allow(null),

  // Date will show a date picker
  birthday: Joi.date().optional(),

  // You can use arrays and sub-objects
  guests: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
    }),
  ),
  hobbies: Joi.array().items(Joi.string()),

  // You can use enums, will show a select field
  color: Joi.any().valid("red", "green", "blue"),
});

export const joiSchemaProvider = new JoiProvider(joiFormSchema);

function App() {
  return (
    <AutoForm
      schema={joiSchemaProvider}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
```

`JoiProvider` exposes the original schema and schema type to `@acp-autoform/react`, so AutoForm can create a React Hook Form resolver automatically. You do not need to configure a Joi resolver manually when using the official provider.

### Joi configuration

#### Label

You can use the `label` method to set a label for each field. If no label is set, the field name will be used and un-camel-cased.

```tsx
const formSchema = Joi.object({
  username: Joi.string().label("Your username"),
  someValue: Joi.string(), // Will be "Some Value"
});
```

To add a description below the field see [`fieldConfig`](/docs/react/customization#description).

#### Optional fields

Joi fields are optional by default. Use `required()` to make a field required.

```tsx
const formSchema = Joi.object({
  username: Joi.string().required(),
  nickname: Joi.string(), // Optional by default
});
```

#### Default values

You can set a default value for a field using the `default` method.

```tsx
const formSchema = Joi.object({
  favouriteNumber: Joi.number().default(5),
});
```

If you want to set default value of date, convert it to Date first using `new Date(val)`.

#### Select/Enums

You can use `any().valid` to create a select field.

```tsx
const formSchema = Joi.object({
  color: Joi.any().valid(["red", "green", "blue"]),
});

enum BreadTypes {
  // For TypeScript enums, the enum values (e.g. "White bread")
  // are displayed, validated and returned in output.
  White = "White bread",
  Brown = "Brown bread",
  Wholegrain = "Wholegrain bread",
  Other = "Other",
}

const formSchema = Joi.object({
  breadType: Joi.any().valid(...Object.values(BreadTypes)),
});
```

If you want a select label to submit a different value, map the labels to values in a custom rule.

```tsx
const nameId = {
  name1: "id1",
  name2: "id2",
} as const;

const formSchema = Joi.object({
  nameId: Joi.any()
    .valid(...Object.keys(nameId))
    .custom((value) => nameId[value as keyof typeof nameId]),
});
```

#### Arrays

AutoForm supports arrays:

```tsx
const formSchema = Joi.object({
  invitedGuests: Joi.array()
    .items(
      // Define the fields for each item
      Joi.object({
        name: Joi.string(),
        age: Joi.number(),
      }),
    )
    // Optionally set a custom label - otherwise this will be inferred from the field name
    .label("Guests invited to the party"),
  hobbies: Joi.array().items(Joi.string()),
});
```

Arrays are not supported as the root element of the form schema.

You also can set default value of an array using .default(), but please make sure the array element has same structure with the schema.

```tsx
// Add array default value example
const formSchema = Joi.object({
  invitedGuests: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        age: Joi.number(),
      }),
    )
    .default([
      { name: "John", age: 24 },
      { name: "Jane", age: 20 },
    ])
    .label("Guests invited to the party"),
});
```

#### Sub-objects

You may use sub-objects to group fields together. These will be rendered with their own title.

```tsx
const formSchema = Joi.object({
  guestDetails: Joi.object({
    name: Joi.string(),
    age: Joi.number(),
  }),
});
```

#### Field configuration

Use the [`fieldConfig`](/docs/react/customization) function to customize how a field is rendered. Import it from `@acp-autoform/joi`.

With Joi, attach it to a field using `.meta(fieldConfig(...))`:

```tsx
import { fieldConfig } from "@acp-autoform/joi";
import Joi from "joi";

const formSchema = Joi.object({
  username: Joi.string()
    .required()
    .meta(
      fieldConfig({
        label: "Username",
        description: "Choose a unique username.",
        inputProps: {
          placeholder: "Enter your username",
        },
      }),
    ),

  password: Joi.string()
    .required()
    .meta(
      fieldConfig({
        inputProps: {
          type: "password",
          placeholder: "Enter your password",
        },
      }),
    ),

  bio: Joi.string().meta(
    fieldConfig({
      fieldType: "textarea",
    }),
  ),
});
```

Provide external types for full TypeScript support.

```tsx
import { FieldTypes } from "@acp-autoform/mui";

Joi.string().meta(
  fieldConfig<React.ReactNode, FieldTypes, any, { isImportant?: boolean }>({
    inputProps: {
      placeholder: "Your name",
    },
    customData: {
      isImportant: true,
    },
  }),
);
```

See the [Customization](/docs/react/customization) page for all available `fieldConfig` options.
