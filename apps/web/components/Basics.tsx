import { AutoForm } from "@acp-autoform/shadcn/components/ui/autoform/AutoForm";
import { AutoFormFieldProps } from "@acp-autoform/react";
import { zodSchemaProvider } from "./utils";
import "@acp-autoform/shadcn/globals.css";

function Basics() {
  return (
    <AutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
      formComponents={{
        custom: ({ label, inputProps }: AutoFormFieldProps) => {
          return (
            <div>
              <input
                type="text"
                className="bg-red-400 rounded-lg p-4"
                {...inputProps}
              />
            </div>
          );
        },
      }}
    />
  );
}

export default Basics;
