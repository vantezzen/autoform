import { AutoForm } from "@acp-autoform/mui/react-hook-form";
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
