# Yup

Basic usage:

```tsx
"use client";
import { YupProvider } from "@autoform/yup";
import { object, string, number, date, InferType, array, mixed } from "yup";
import { buildYupFieldConfig } from "@autoform/react";
import { AutoForm, FieldTypes } from "@autoform/mui"; // use any UI library

const fieldConfig = buildYupFieldConfig<
  FieldTypes,
  {
    // You can define custom props here
    isImportant?: boolean;
  }
>();

// Define your form schema using yup
const yupFormSchema = object({
  name: string().required().label("Your Name").default("John Doe"),

  age: number()
    .required(
      // You can use custom error messages
      "We need your age to verify you're old enough to use this form"
    )
    .positive()
    .integer(),

  email: string()
    .email()
    // You can use fieldConfig to set additional configuration for a field
    .transform(
      fieldConfig<React.ReactNode, FieldTypes>({
        inputProps: {
          type: "email",
        },
        customData: {
          // You can add custom data here
          isImportant: true,
        },
      })
    ),
  website: string().url().nullable(),

  // You can use arrays and sub-objects
  guests: array().of(
    object({
      name: string().required(),
    })
  ),
  hobbies: array().of(string()),

  // You can use enums
  sport: mixed().oneOf(Object.values(Sports)),
});

export const yupSchemaProvider = new YupProvider(yupFormSchema);

function App() {
  return (
    <AutoForm
      schema={yupSchemaProvider}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
```

### Yup configuration

#### Validations

Your form schema can use any of yup's validation methods.

#### Label

You can use the `label` method to set a label and description for each field. If no label is set, the field name will be used and un-camel-cased.

```tsx
const formSchema = object({
  username: string().label("Your username"),
  someValue: string(), // Will be "Some Value"
});
```

#### Default values

You can set a default value for a field using the `default` method.

```tsx
const formSchema = object({
  favouriteNumber: number().default(5),
});
```

If you want to set default value of date, convert it to Date first using `new Date(val)`.

#### Select/Enums

You can use `mixed().oneOf` to create a select field.

```tsx
enum BreadTypes {
  // For native enums, you can alternatively define a backed enum to set a custom label
  White = "White bread",
  Brown = "Brown bread",
  Wholegrain = "Wholegrain bread",
  Other,
}
const formSchema = object({
  breadType: mixed().oneOf(Object.values(BreadTypes)),
});
```

#### Arrays

AutoForm supports arrays:

```tsx
const formSchema = object({
  invitedGuests: array(
    // Define the fields for each item
    object({
      name: string(),
      age: number(),
    })
  )
    // Optionally set a custom label - otherwise this will be inferred from the field name
    .label("Guests invited to the party"),
  hobbies: array(string()),
});
```

Arrays are not supported as the root element of the form schema.

You also can set default value of an array using .default(), but please make sure the array element has same structure with the schema.

#### Sub-objects

You may use sub-objects to group fields together. These will be rendered with their own title.

```tsx
const formSchema = object({
  guestDetails: object({
    name: string(),
    age: number(),
  }),
});
```

#### Field configuration

You can use the `fieldConfig` function to set additional configuration for how a field should be rendered. This function is independent of the UI library you use so you can provide the FieldTypes that are supported by your UI library.

It's recommended that you create your own fieldConfig function that uses the base fieldConfig function from `@autoform/react` and adds your own customizations:

```tsx
import { buildYupFieldConfig } from "@autoform/react";
import { FieldTypes } from "@autoform/mui";

export const fieldConfig = buildYupFieldConfig<
  FieldTypes, // You should provide the "FieldTypes" type from the UI library you use
  {
    isImportant?: boolean; // You can add custom props here
  }
>();
```
