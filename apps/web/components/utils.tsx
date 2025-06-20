import {
  fieldConfig,
  FieldWrapperProps,
  buildZodFieldConfig,
} from "@autoform/react";
import Joi from "joi";
import * as z from "zod";
import * as z4 from "zod/v4";
import * as zm from "zod/v4-mini";
import {
  ZodProvider as ZodProvider4,
  fieldConfig as config,
} from "@autoform/zod/v4";
import { object, string, number, date, InferType, array, mixed } from "yup";
import { ZodProvider } from "@autoform/zod";
import { YupProvider, fieldConfig as yupFieldConfig } from "@autoform/yup";
import { JoiProvider, fieldConfig as joiFieldConfig } from "@autoform/joi";

const customFieldConfig = buildZodFieldConfig<
  string,
  {
    isImportant?: boolean;
  }
>();

enum Sports {
  Football = "Football/Soccer",
  Basketball = "Basketball",
  Baseball = "Baseball",
  Hockey = "Hockey (Ice)",
  None = "I don't like sports",
}

const zodFormSchema = z.object({
  // hobbies: z
  //   .string()
  //   .optional()
  //   .superRefine(
  //     customFieldConfig({
  //       description: "This uses a custom field component",
  //       order: 1,
  //       fieldType: "custom",
  //       customData: {
  //         // You can define custom data here
  //         isImportant: true,
  //       },
  //     })
  //   ),
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .superRefine(
      fieldConfig({
        description: "You cannot change this later.",
      })
    ),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .superRefine(
      fieldConfig({
        description: (
          <>
            Always use a <b>secure password</b>!
          </>
        ),
        inputProps: {
          type: "password",
        },
      })
    ),
  favouriteNumber: z.coerce
    .number({
      invalid_type_error: "Favourite number must be a number.",
    })
    .min(1, {
      message: "Favourite number must be at least 1.",
    })
    .max(10, {
      message: "Favourite number must be at most 10.",
    })
    .default(1)
    .optional(),
  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
      path: ["acceptTerms"],
    }),
  sendMeMails: z
    .boolean()
    .optional()
    .superRefine(
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
      })
    ),
  birthday: z.coerce.date({ message: "aaa" }).optional(),
  color: z.enum(["red", "green", "blue"]).optional(),
  // Another enum example
  marshmallows: z
    .enum(["not many", "a few", "a lot", "too many"])
    .describe("How many marshmallows fit in your mouth?"),
  // Native enum example
  sports: z.nativeEnum(Sports).describe("What is your favourite sport?"),
  guests: z.array(
    z.object({
      name: z.string(),
      age: z.coerce.number().optional(),
      location: z.object({
        city: z.string(),
        country: z.string().optional(),
        test: z.object({
          name: z.string(),
          age: z.coerce.number(),
          test: z.object({
            name: z.string(),
            age: z.coerce.number(),
            test: z.object({
              name: z.string(),
              age: z.coerce.number(),
              test: z.object({
                name: z.string(),
                age: z.coerce.number(),
              }),
            }),
          }),
        }),
      }),
    })
  ),
  // location: z.object({
  //   city: z.string(),
  //   country: z.string().optional(),
  //   test: z.object({
  //     name: z.string(),
  //     age: z.coerce.number(),
  //     test: z.object({
  //       name: z.string(),
  //       age: z.coerce.number(),
  //       test: z.object({
  //         name: z.string(),
  //         age: z.coerce.number(),
  //         test: z.object({
  //           name: z.string(),
  //           age: z.coerce.number(),
  //         }),
  //       }),
  //     }),
  //   }),
  // }),
  // obj
});

const zodFormSchema4 = z4.object({
  username: z4
    .string({
      error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .register(
      ...config({
        description: "You cannot change this later.",
      })
    ),
  password: z4
    .string({
      error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .default("this ia s good pass")
    .describe("Your secure password")
    .register(
      ...config({
        description: (
          <>
            Always use a <b>secure password</b>!
          </>
        ),
        inputProps: {
          type: "password",
        },
      })
    ),
  favouriteNumber: z4.coerce
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
  acceptTerms: z4
    .boolean()
    .describe("Accept terms and conditions.")
    .default(true)
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
    }),
  sendMeMails: z4
    .boolean()
    .optional()
    .default(false)
    .register(
      ...config({
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
      })
    ),
  birthday: z4.coerce.date({ message: "aaa" }).optional(),
  color: z4.enum(["red", "green", "blue"]).default("red").optional(),
  // Another enum example
  marshmallows: z4
    .enum(["not many", "a few", "a lot", "too many"])
    .describe("How many marshmallows fit in your mouth?"),
  // Native enum example
  sports: z4.enum(Sports).describe("What is your favourite sport?"),
  guests: z4.array(
    z4.object({
      name: z4.string(),
      age: z4.coerce.number().optional(),
      location: z4.object({
        city: z4.string(),
        country: z4.string().optional(),
        test: z4.object({
          name: z4.string(),
          age: z4.coerce.number(),
          test: z4.object({
            name: z4.string(),
            age: z4.coerce.number(),
            test: z4.object({
              name: z4.string(),
              age: z4.coerce.number(),
              test: z4.object({
                name: z4.string(),
                age: z4.coerce.number(),
              }),
            }),
          }),
        }),
      }),
    })
  ),
});

// zod mini
const zodFormSchema4mini = zm.object({
  username: zm
    .string({
      error: "Username is required.",
    })
    .check(
      zm.minLength(2, {
        message: "Username must be at least 2 characters.",
      })
    )
    .register(
      ...config({
        // Changed from superRefine to register
        description: "You cannot change this later.",
      })
    ),

  password: zm
    .string({
      error: "Password is required.",
    })
    .check(
      zm.minLength(8, {
        message: "Password must be at least 8 characters.",
      })
    )
    .register(
      ...config({
        // Changed from superRefine to register
        description: "Always use a secure password!",
        inputProps: {
          type: "password",
        },
      })
    ),

  sendMeMails: zm.optional(zm.boolean()).register(
    ...config({
      // Changed from superRefine to register
      fieldWrapper: (props: FieldWrapperProps) => (
        <>
          {props.children}
          <p className="text-muted-foreground text-sm">
            Don't worry, we only send important emails!
          </p>
        </>
      ),
    })
  ),

  favouriteNumber: zm.optional(zm._default(zm.number(), 4)).register(
    ...config({
      description: "Enter your favourite number",
      label: "Favourite Number !!!",
    })
  ),

  favouriteSport: zm.enum(["red", "green", "blue"]).register(
    ...config({
      description: "Your favourite sport",
    })
  ),

  Birthdate: zm.optional(zm.date()),
  array: zm.array(
    zm.object({
      mini: zm.string(),
      age: zm.number(),
      isStudent: zm._default(zm.boolean(), true),
    })
  ),
  object: zm.object({
    mini: zm.optional(zm.string()),
    age: zm.optional(zm.number()),
    isStudent: zm.optional(zm.boolean()),
  }),
});

export const zodSchemaProvider = new ZodProvider4(zodFormSchema4mini);

const yupFormSchema = object({
  name: string().required().label("Your Name").default("John Doe"),
  age: number()
    .required("We need your age to verify you are able to receive discounts.")
    .positive()
    .integer(),
  password: string().transform(
    yupFieldConfig({
      inputProps: {
        type: "password",
      },
    })
  ),
  email: string()
    .email()
    .transform((val) => val),
  website: string().url().nullable(),
  // createdOn: date().default(() => new Date()),
  guests: array().of(
    object({
      name: string().required(),
    })
  ),
  abc: date().optional(),
  sport: mixed().oneOf(Object.values(Sports)),
  hobbies: array().of(string()),
});

export const yupSchemaProvider = new YupProvider(yupFormSchema);

const joiFormSchema = Joi.object({
  username: Joi.string()
    .min(2)
    .required()
    .messages({
      "any.required": "Username is required.",
      "string.min": "Username must be at least 2 characters.",
    })
    .meta(
      joiFieldConfig({
        description: "You cannot change this later.",
        inputProps: {
          placeholder: "Enter your username",
        },
      })
    ),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.min": "Password must be at least 8 characters.",
    })
    .meta(
      joiFieldConfig({
        description: (
          <>
            Always use a <b>secure password</b>!
          </>
        ),
        inputProps: {
          type: "password",
        },
      })
    ),

  favouriteNumber: Joi.number().min(1).max(10).default(1).messages({
    "number.base": "Favourite number must be a number.",
    "number.min": "Favourite number must be at least 1.",
    "number.max": "Favourite number must be at most 10.",
  }),

  acceptTerms: Joi.boolean()
    .valid(true)
    .required()
    .messages({
      "any.only": "You must accept the terms and conditions.",
    })
    .label("Accept terms and conditions."),

  sendMeMails: Joi.boolean()
    .optional()
    .meta(
      joiFieldConfig({
        fieldWrapper: (props: any) => {
          return (
            <>
              {props.children}
              <p className="text-muted-foreground text-xs">
                Don't worry, we only send important emails!
              </p>
            </>
          );
        },
      })
    ),

  birthday: Joi.date().optional().messages({
    "date.base": "aaa",
  }),

  color: Joi.any().valid("red", "green", "blue").optional(),

  marshmallows: Joi.any()
    .valid("not many", "a few", "a lot", "too many")
    .required()
    .label("How many marshmallows fit in your mouth?"),

  sports: Joi.any()
    .valid(...Object.values(Sports))
    .required()
    .label("What is your favourite sport?"),

  guests: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      age: Joi.number().optional(),
      location: Joi.object({
        city: Joi.string().required(),
        country: Joi.string().optional(),
        test: Joi.object({
          name: Joi.string().required(),
          age: Joi.number().required(),
          test: Joi.object({
            name: Joi.string().required(),
            age: Joi.number().required(),
            test: Joi.object({
              name: Joi.string().required(),
              age: Joi.number().required(),
              test: Joi.object({
                name: Joi.string().required(),
                age: Joi.number().required(),
              }),
            }),
          }),
        }),
      }),
    })
  ),
});

export const joiSchemaProvider = new JoiProvider(joiFormSchema);
