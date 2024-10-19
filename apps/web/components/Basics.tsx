import { AutoForm, FieldTypes } from "@autoform/mui";
import { ZodProvider } from "@autoform/zod";
import { zodSchemaProvider } from "./utils";

function Basics() {
  return (
    <AutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      onFormInit={(form) => {
        console.log("Form initialized", form);
      }}
      withSubmit
    />
  );
}

export default Basics;
