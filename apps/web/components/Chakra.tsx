import { AutoForm, fieldConfig } from "@autoform/chakra";
import { zodSchemaProvider } from "./utils";

function Chakra() {
  return (
    <AutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      withSubmit
    />
  );
}

export default Chakra;
