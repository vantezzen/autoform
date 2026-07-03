# Schema Reference

## Table of Contents

- [Zod](#zod)
- [Yup](#yup)
- [Joi](#joi)

---

## Zod

Package: `@dual-autoform/zod`; supports Zod v3, Zod v4, and Zod Mini.

Requires `zod ^3.25.0 || ^4`.

Attach `fieldConfig` with `.check(...)` in Zod v4 / Zod Mini, or `.superRefine(...)` in Zod v3.

```tsx
import * as z from "zod";
import { ZodProvider, fieldConfig } from "@dual-autoform/zod";
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
import type { FieldTypes } from "@dual-autoform/mui/react-hook-form";
import type { FieldWrapperProps } from "@dual-autoform/react";

const nameId = {
  name1: "id1",
  name2: "id2",
} as const;

const formSchema = z.object({
  // Field name becomes the label automatically: `username` -> "Username".
  username: z
    .string({
      error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    // `.default()` is a validation fallback. — if the field is empty, the .default replaces it in the output. For pre-filled values the user can clear, use `<AutoForm defaultValues={...} />`.
    .default("Default username !!")
    // Zod v4 and Zod Mini attach `fieldConfig` with `.check()`.
    // Zod v3 uses `.superRefine(fieldConfig({...}))` instead.
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
    .default("this is a good pass")
    // `.describe()` sets the field label. Without it, the field name is un-camel-cased automatically.
    .describe("Your secure password")
    .check(
      // Provide generic type parameters for full type safety
      fieldConfig<React.ReactNode, FieldTypes, { isImportant?: boolean }>({
        // `description` can be text or a React node.
        description: (
          <>
            Always use a <b>secure password</b>!
          </>
        ),
        // `inputProps` are passed to the rendered input.
        inputProps: {
          type: "password",
        },
        customData: { isImportant: true },
      }),
    ),

  // HTML inputs return strings, so use coercion for number and date fields.
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

  // Booleans render as checkbox-style controls.
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
        // Field-level wrappers affect only this field.
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

  // HTML date inputs submit strings, so use coercion for browser date fields.
  // For defaultValues, pass a Date object.
  birthday: z.coerce.date().optional(),

  // Transform an enum label to a different submitted value.
  nameId: z
    .enum(Object.keys(nameId) as [string, ...string[]], {
      message: "Invalid name",
    })
    .transform((name) => nameId[name as keyof typeof nameId])
    .optional(),

  // Enums render as select/radio-style choices depending on the UI package.
  color: z.enum(["red", "green", "blue"]).default("red").optional(),

  // Arrays are supported as fields, but not as the root schema.
  guests: z.array(
    // Sub-objects render as nested object groups.
    z.object({
      name: z.string(),
      age: z.coerce.number().optional(),
    }),
  ),
  // Sub-objcts
  yourDetails: z.object({
    name: z.string(),
    age: z.coerce.number(),
  }),
});

const schemaProvider = new ZodProvider(formSchema);
```

For Zod Mini, import `z` from `zod/mini` and keep using `fieldConfig` from `@dual-autoform/zod`.

For more `fieldConfig` details, see `references/customization.md` lines 5-70.

---

## Yup

Package: `@dual-autoform/yup`

Attach `fieldConfig` with `.transform(...)`.

```tsx
import { YupProvider, fieldConfig } from "@dual-autoform/yup";
import { object, string, number, array, mixed } from "yup";
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
import type { FieldTypes } from "@dual-autoform/mui/react-hook-form";

const yupSchema = object({
  // `.label()` sets the field label. Yup fields are optional unless `.required()` is used.
  name: string().required().label("Your Name").default("John Doe"),
  age: number().required("We need your age").positive().integer(),
  email: string()
    .email()
    // Yup attaches `fieldConfig` with `.transform()`.
    .transform(
      fieldConfig<React.ReactNode, FieldTypes>({
        inputProps: { type: "email" },
      }),
    ),
  website: string().url().nullable(),

  // Arrays and sub-objects are supported as fields.
  guests: array().of(object({ name: string().required() })),
  hobbies: array().of(string()),

  // Enums use `mixed().oneOf(...)`.
  sport: mixed().oneOf(["football", "basketball", "tennis"]),
});

const schemaProvider = new YupProvider(yupSchema);
```

For more `fieldConfig` details, see `references/customization.md` lines 5-70.

---

## Joi

Package: `@dual-autoform/joi`

Attach `fieldConfig` with `.meta(...)`.

```tsx
import { JoiProvider, fieldConfig } from "@dual-autoform/joi";
import Joi from "joi";
import { AutoForm } from "@dual-autoform/mui/react-hook-form";
import type { FieldTypes } from "@dual-autoform/mui/react-hook-form";

const joiSchema = Joi.object({
  // `.label()` sets the field label. Joi fields are optional unless `.required()` is used.
  name: Joi.string().required().label("Your Name").default("John Doe"),
  age: Joi.number().required().positive().integer(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    // Joi attaches `fieldConfig` with `.meta()`.
    .meta(
      fieldConfig<React.ReactNode, FieldTypes>({
        inputProps: { type: "email" },
      }),
    ),
  birthday: Joi.date().optional(),

  // Arrays and sub-objects are supported as fields.
  guests: Joi.array().items(Joi.object({ name: Joi.string().required() })),

  // Enums use `Joi.any().valid(...)`.
  color: Joi.any().valid("red", "green", "blue"),
});

const schemaProvider = new JoiProvider(joiSchema);
```

For more `fieldConfig` details, see `references/customization.md` lines 5-70.
