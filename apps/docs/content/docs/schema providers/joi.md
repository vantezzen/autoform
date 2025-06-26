---
title: Joi
---

Basic usage:

```tsx
"use client";
import { JoiProvider } from "@autoform/joi";
import Joi from "joi";
import { buildJoiFieldConfig } from "@autoform/react";
import { AutoForm, FieldTypes } from "@autoform/mui"; // use any UI library

const fieldConfig = buildJoiFieldConfig<
  FieldTypes,
  {
    // You can define custom props here
    isImportant?: boolean;
  }
>();

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
      fieldConfig({
        inputProps: {
          type: "email",
        },
        customData: {
          // You can add custom data here
          isImportant: true,
        },
      })
    ),

  website: Joi.string().uri().allow(null),

  // Date will show a date picker
  birthday: Joi.date().optional(),

  // You can use arrays and sub-objects
  guests: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
    })
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

### Joi configuration

#### Validations

Your form schema can use any of Joi's validation methods.

#### Label

You can use the `label` method to set a label for each field. If no label is set, the field name will be used and un-camel-cased.

```tsx
const formSchema = Joi.object({
  username: Joi.string().label("Your username"),
  someValue: Joi.string(), // Will be "Some Value"
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
enum BreadTypes {
  White = "White bread",
  Brown = "Brown bread",
  Wholegrain = "Wholegrain bread",
  Other = "Other",
}

const formSchema = Joi.object({
  breadType: Joi.any().valid(...Object.values(BreadTypes)),
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
      })
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
      })
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

You can use the `fieldConfig` function to set additional configuration for how a field should be rendered. This function is independent of the UI library you use so you can provide the FieldTypes that are supported by your UI library.

It's recommended that you create your own fieldConfig function that uses the base fieldConfig function from `@autoform/react` and adds your own customizations:

```tsx
import { buildJoiFieldConfig } from "@autoform/react";
import { FieldTypes } from "@autoform/mui";

const fieldConfig = buildJoiFieldConfig<
  FieldTypes, // You should provide the "FieldTypes" type from the UI library you use
  {
    isImportant?: boolean; // You can add custom props here
  }
>();
```
