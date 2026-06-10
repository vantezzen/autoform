import { createAutoForm } from "@acp-autoform/mui";
import { AutoForm as AutoFormRHF } from "@acp-autoform/react/react-hook-form";
const AutoForm = createAutoForm(AutoFormRHF);
import { ZodProvider } from "@acp-autoform/zod";
import { useState } from "react";
import * as z from "zod";
import { zodSchemaProvider } from "./utils";

const formSchema = z.object({
  guest: z.string(),
});
const schemaProvider = new ZodProvider(formSchema);

function Array() {
  const [values, setValues] = useState<Partial<z.infer<typeof formSchema>>>({
    guest: "John Doe",
  });

  return (
    <AutoForm
      schema={zodSchemaProvider}
      // values={values}
      // setValues={setValues}
      withSubmit
    />
  );
}

export default Array;
