import { AutoForm } from "@autoform/chakra";
import { zodSchemaProvider } from "./utils";

function Chakra() {
  return (
    <AutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      colorModeProps={{
        enableSystem: false,
      }}
      withSubmit
    />
  );
}

export default Chakra;
