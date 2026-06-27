import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import z from "zod";
import { fieldConfig, ZodProvider } from "@dual-autoform/zod";
import { AutoForm } from "@dual-autoform/mantine/react-hook-form";
import HookTest from "./Hook-test";

const fieldSchema = z.object({
  name: z
    .string({ message: "required" })
    .min(2, "Name must be at least 2 characters"),
  age: z.coerce.number().min(18, "Must be at least 18 years old"),
  color: z.enum(["red", "green", "blue"]),
  birthdate: z.coerce.date(),
  isStudent: z.boolean(),
  test: z
    .string()
    .optional()
    .check(
      fieldConfig({
        fieldType: "custom",
      }),
    ),
});
const schemaProvider = new ZodProvider(fieldSchema);

const TestForm = () => {
  return (
    <MantineProvider>
      <AutoForm
        schema={schemaProvider}
        onSubmit={(values) => console.log("values", values)}
        formComponents={{
          custom: HookTest,
        }}
        defaultValues={{
          name: undefined,
          age: undefined,
          color: undefined,
          birthdate: undefined,
          isStudent: false,
        }}
        withSubmit
      />
    </MantineProvider>
  );
};

export default TestForm;
