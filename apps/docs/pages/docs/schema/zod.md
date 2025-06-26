# Zod

Basic usage:

```tsx
"use client";
import * as z from "zod";
import { ZodProvider } from "@autoform/zod";
import { buildZodFieldConfig } from "@autoform/react";
import { AutoForm, FieldTypes } from "@autoform/mui"; // use any UI library

const fieldConfig = buildZodFieldConfig<
  FieldTypes,
  {
    // You can define custom props here
    isImportant?: boolean;
  }
>();

// Define your form schema using zod
const formSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    // You can add additional config for how to render this field
    // using fieldConfig
    .superRefine(
      fieldConfig<React.ReactNode, FieldTypes>({
        description: "We recommend to use a strong password.",
        inputProps: {
          type: "password",
        },
        customData: {
          // You can add custom data here
          isImportant: true,
        },
      }),
    ),

  favouriteNumber: z.coerce // When using numbers and dates, you must use coerce
    .number({
      invalid_type_error: "Favourite number must be a number.",
    })
    .min(1, {
      message: "Favourite number must be at least 1.",
    })
    .max(10, {
      message: "Favourite number must be at most 10.",
    })
    .default(5) // You can set a default value
    .optional(),

  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    }),

  // Date will show a date picker
  birthday: z.coerce.date().optional(),

  // Enum will show a select
  color: z.enum(["red", "green", "blue"]),

  // You can use sub-objects that will be rendered with their own title
  guestDetails: z.object({
    name: z.string(),
    age: z.coerce.number(),
  }),
});

const schemaProvider = new ZodProvider(formSchema);

function App() {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
```

### Zod configuration

#### Validations

Your form schema can use any of zod's validation methods including refine.

Autoform is able to automatically transform some of zod's validation elements into HTML attributes. For example, if you use `zod.string().min(8)`, the input will automatically have a `minlength="8"` attribute.

Validation methods that are not supported by HTML will automatically be checked when the form is submitted.

#### Descriptions

You can use the `describe` method to set a label and description for each field. If no label is set, the field name will be used and un-camel-cased.

```tsx
const formSchema = z.object({
  username: z.string().describe("Your username"),
  someValue: z.string(), // Will be "Some Value"
});
```

#### Coercion

When using numbers and dates, you should use coerce. This is because input elements may return a string that should automatically be converted.

```tsx
const formSchema = z.object({
  favouriteNumber: z.coerce.number(),
  birthday: z.coerce.date(),
});
```

#### Optional fields

By default, all fields are required. You can make a field optional by using the `optional` method.

```tsx
const formSchema = z.object({
  username: z.string().optional(),
});
```

#### Default values

You can set a default value for a field using the `default` method.

```tsx
const formSchema = z.object({
  favouriteNumber: z.number().default(5),
});
```

If you want to set default value of date, convert it to Date first using `new Date(val)`.

#### Select/Enums

AutoForm supports `enum` and `nativeEnum` to create select fields.

```tsx
const formSchema = z.object({
  color: z.enum(["red", "green", "blue"]),
});

enum BreadTypes {
  // For native enums, you can alternatively define a backed enum to set a custom label
  White = "White bread",
  Brown = "Brown bread",
  Wholegrain = "Wholegrain bread",
  Other,
}
// Keep in mind that zod will validate and return the enum labels, not the enum values!
const formSchema = z.object({
  bread: z.nativeEnum(BreadTypes),
});
```

#### Arrays

AutoForm supports arrays:

```tsx
const formSchema = z.object({
  invitedGuests: z
    .array(
      // Define the fields for each item
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      }),
    )
    // Optionally set a custom label - otherwise this will be inferred from the field name
    .describe("Guests invited to the party"),
  hobbies: z.array(z.string()),
});
```

Arrays are not supported as the root element of the form schema.

You also can set default value of an array using .default(), but please make sure the array element has same structure with the schema.

```tsx
const formSchema = z.object({
  guestListName: z.string(),
  invitedGuests: z
    .array(
      // Define the fields for each item
      z.object({
        name: z.string(),
        age: z.coerce.number(),
      }),
    )
    .describe("Guests invited to the party")
    .default([
      {
        name: "John",
        age: 24,
      },
      {
        name: "Jane",
        age: 20,
      },
    ]),
});
```

#### Sub-objects

You may use sub-objects to group fields together. These will be rendered with their own title.

```tsx
const formSchema = z.object({
  guestDetails: z.object({
    name: z.string(),
    age: z.coerce.number(),
  }),
});
```

#### Field configuration

You can use the `fieldConfig` function to set additional configuration for how a field should be rendered. This function is independent of the UI library you use so you can provide the FieldTypes that are supported by your UI library.

**Zod v3:**

For Zod v3, it's recommended that you create your own fieldConfig function that uses the base `buildZodFieldConfig` function from `@autoform/react` and adds your own customizations. You apply this configuration using the `.superRefine()` method.

```tsx
import { buildZodFieldConfig } from "@autoform/react";
import { FieldTypes } from "@autoform/mui"; // or your UI library's FieldTypes

const fieldConfig = buildZodFieldConfig<
  FieldTypes,
  {
    isImportant?: boolean;
  }
>();

// Example usage with Zod v3
const formSchemaV3 = z.object({
  password: z.string().superRefine(
    fieldConfig<React.ReactNode, FieldTypes>({
      description: "We recommend to use a strong password.",
      inputProps: {
        type: "password",
      },
      customData: {
        isImportant: true,
      },
    }),
  ),
});
```

**Zod v4:**

With Zod v4, the method for applying `fieldConfig` has changed. You now use the `fieldConfig` function directly from `@autoform/zod/v4` and apply it using the `.register()` method provided by Zod v4.

Here's an example demonstrating the new usage:

```tsx
import * as z from "zod/v4";
import { ZodProvider, fieldConfig } from "@autoform/zod/v4"; // Import fieldConfig from v4
import { AutoForm, FieldTypes } from "@autoform/mui"; // or your UI library's FieldTypes

// Define your form schema using zod v4
const formSchemaV4 = z.object({
  // ... other fields

  password: z
    .string({
      required_error: "Password is required.",
    })
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    // Use .register() with the spread operator (...)
    .register(
      ...fieldConfig<React.ReactNode, FieldTypes>({
        description: "We recommend to use a strong password.",
        inputProps: {
          type: "password",
        },
        customData: {
          // You can add custom data here
          isImportant: true,
        },
      }),
    ),

  // ... other fields
});

const schemaProviderV4 = new ZodProvider(formSchemaV4);

function AppV4() {
  return (
    <AutoForm
      schema={schemaProviderV4}
      onSubmit={(data) => {
        console.log(data);
      }}
      withSubmit
    />
  );
}
```

Notice the use of the spread operator (`...`) before `fieldConfig` when calling `.register()`. This is necessary because `register` expects two arguments, and the `fieldConfig` function from `@autoform/zod/v4` returns a tuple `[key, value]`. Also note that you should import `ZodProvider` and `fieldConfig` from `@autoform/zod/v4` when using Zod v4.

```tsx
import { buildZodFieldConfig } from "@autoform/react";
import { FieldTypes } from "@autoform/mui";

const fieldConfig = buildZodFieldConfig<
  FieldTypes,
  {
    isImportant?: boolean;
  }
>();
```
