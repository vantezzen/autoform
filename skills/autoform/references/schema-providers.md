# Schema Providers Reference

## Table of Contents

- [Zod](#zod)
- [Yup](#yup)
- [Joi](#joi)

---

## Zod

Package: `@acp-autoform/zod` — supports Zod v3, v4, and Zod Mini.

> requires zod version greater than 3.25.0 to be installed ^3.25.0 || ^4

### Basic usage

```tsx
import * as z from "zod";
import { ZodProvider, fieldConfig } from "@acp-autoform/zod";
import { AutoForm } from "@acp-autoform/mui/react-hook-form";
import type { FieldTypes } from "@acp-autoform/mui";

const nameId = {
  name1: "id1",
  name2: "id2",
} as const;

const formSchema = z.object({
  username: z
    .string({
      error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .default("Default username !!")
    .check(
      fieldConfig({
        description: "You cannot change this later.",
      }),
    ),
  password: z
    .string({
      error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .default("this ia s good pass")
    .describe("Your secure password")
    .check(
      fieldConfig({
        description: (
          <>
            Always use a <b>secure password</b>!
          </>
        ),
        inputProps: {
          type: "password",
        },
      }),
    ),
  favouriteNumber: z.coerce
    .number({
      error: "Favourite number must be a number.",
    })
    .min(1, {
      message: "Favourite number must be at least 1.",
    })
    .max(10, {
      message: "Favourite number must be at most 10.",
    })
    .default(9)
    .optional(),
  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .default(true)
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
    }),
  sendMeMails: z
    .boolean()
    .optional()
    .default(false)
    .check(
      fieldConfig({
        fieldWrapper: (props: FieldWrapperProps) => {
          return (
            <>
              {props.children}
              <p className="text-muted-foreground text-sm">
                Don't worry, we only send important emails!
              </p>
            </>
          );
        },
      }),
    ),
  birthday: z.date().optional(),

  nameId: z
    .enum(Object.keys(nameId) as [string, ...string[]], {
      message: "Invalid name",
    })
    .transform((name) => nameId[name as keyof typeof nameId])
    .optional(),
  // get id as output and name as label

  color: z.enum(["red", "green", "blue"]).default("red").optional(),

  guests: z.array(
    z.object({
      name: z.string(),
      age: z.coerce.number().optional(),
    }),
  ),
});

const schemaProvider = new ZodProvider(formSchema);
```

### Labels

Use `.describe()` to set a label. Without it, the field name is un-camel-cased automatically.

```tsx
username: z.string().describe("Your username"),
someValue: z.string(), // → "Some Value"
```

### Coercion

HTML inputs return strings. Use `z.coerce.number()` for number fields:

```tsx
favouriteNumber: z.coerce.number(),
```

### Optional fields

```tsx
username: z.string().optional(),
```

### Default values

`.default()` is a validation fallback — if the field is empty, the default replaces it in the output. For pre-filled values the user can clear, use the `defaultValues` prop on AutoForm.

```tsx
favouriteNumber: z.number().default(5),
```

### Select/Enums

```tsx
color: z.enum(["red", "green", "blue"]),

// TypeScript enum
enum BreadTypes {
  White = "White bread",
  Brown = "Brown bread",
}
bread: z.nativeEnum(BreadTypes),
```

To map display labels to different values:

```tsx
const nameId = { name1: "id1", name2: "id2" } as const;
nameId: z.enum(Object.keys(nameId) as [string, ...string[]])
  .transform((name) => nameId[name as keyof typeof nameId]),
```

### Arrays

```tsx
invitedGuests: z.array(z.object({
  name: z.string(),
  age: z.coerce.number(),
})).describe("Guests"),
hobbies: z.array(z.string()),
```

Arrays are NOT supported as the root schema — they must be inside an object.

### Sub-objects

```tsx
guestDetails: z.object({
  name: z.string(),
  age: z.coerce.number(),
}),
```

### fieldConfig attachment

Depends on Zod version:

**Zod v4 and Zod Mini** — use `.check()`:

```tsx
import { fieldConfig } from "@acp-autoform/zod";

username: z.string().check(
  fieldConfig({ description: "You cannot change this later." })
),
```

**Zod Mini**

```tsx
import { fieldConfig } from "@acp-autoform/zod";
import { z } from "zod/mini";
```

**Zod v3** — use `.superRefine()`:

```tsx
import { fieldConfig } from "@acp-autoform/zod";

username: z.string().superRefine(
  fieldConfig({ label: "Username", inputProps: { placeholder: "Enter..." } })
),
```

### TypeScript support

Provide generic type parameters for full type safety:

```tsx
import { FieldTypes } from "@acp-autoform/mui";

z.string().check(
  fieldConfig<React.ReactNode, FieldTypes, { isImportant?: boolean }>({
    inputProps: { type: "password" },
    customData: { isImportant: true },
  }),
);
```

---

## Yup

Package: `@acp-autoform/yup`

### Basic usage

```tsx
import { YupProvider, fieldConfig } from "@acp-autoform/yup";
import { object, string, number, date, array, mixed } from "yup";
import { AutoForm } from "@acp-autoform/mui/react-hook-form";
import type { FieldTypes } from "@acp-autoform/mui";

const yupSchema = object({
  name: string().required().label("Your Name").default("John Doe"),
  age: number().required("We need your age").positive().integer(),
  email: string()
    .email()
    .transform(
      fieldConfig<React.ReactNode, FieldTypes>({
        inputProps: { type: "email" },
      }),
    ),
  website: string().url().nullable(),
  guests: array().of(object({ name: string().required() })),
  hobbies: array().of(string()),
  sport: mixed().oneOf(Object.values(Sports)),
});

const schemaProvider = new YupProvider(yupSchema);
```

### Labels

```tsx
username: string().label("Your username"),
```

### Optional / Required

Yup fields are optional by default. Use `.required()` to make them required.

### Default values

```tsx
favouriteNumber: number().default(5),
```

### Enums

```tsx
color: mixed().oneOf(["red", "green", "blue"]),
```

### Arrays

```tsx
guests: array().of(object({ name: string() })).label("Guests"),
```

### fieldConfig attachment — use `.transform()`:

```tsx
import { fieldConfig } from "@acp-autoform/yup";

username: string().required().transform(
  fieldConfig({
    label: "Username",
    description: "Choose a unique username.",
    inputProps: { placeholder: "Enter your username" },
  })
),
```

---

## Joi

Package: `@acp-autoform/joi`

### Basic usage

```tsx
import { JoiProvider, fieldConfig } from "@acp-autoform/joi";
import Joi from "joi";
import { AutoForm } from "@acp-autoform/mui/react-hook-form";
import type { FieldTypes } from "@acp-autoform/mui";

const joiSchema = Joi.object({
  name: Joi.string().required().label("Your Name").default("John Doe"),
  age: Joi.number().required().positive().integer(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .meta(
      fieldConfig<React.ReactNode, FieldTypes>({
        inputProps: { type: "email" },
      }),
    ),
  birthday: Joi.date().optional(),
  guests: Joi.array().items(Joi.object({ name: Joi.string().required() })),
  color: Joi.any().valid("red", "green", "blue"),
});

const schemaProvider = new JoiProvider(joiSchema);
```

### Labels

```tsx
username: Joi.string().label("Your username"),
```

### Optional / Required

Joi fields are optional by default. Use `.required()` for required.

### Enums

```tsx
color: Joi.any().valid("red", "green", "blue"),
breadType: Joi.any().valid(...Object.values(BreadTypes)),
```

### fieldConfig attachment — use `.meta()`:

```tsx
import { fieldConfig } from "@acp-autoform/joi";

username: Joi.string().required().meta(
  fieldConfig({
    label: "Username",
    inputProps: { placeholder: "Enter your username" },
  })
),
```
