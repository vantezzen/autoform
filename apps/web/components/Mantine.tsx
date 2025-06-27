import { createTheme, MantineProvider } from "@mantine/core";
import { AutoForm } from "@autoform/mantine";
import { zodSchemaProvider } from "./utils";
import "@mantine/core/styles.css";

function Mantine() {
  const theme = createTheme({});
  return (
    <MantineProvider theme={theme}>
      <AutoForm
        schema={zodSchemaProvider}
        onSubmit={(data) => {
          console.log(JSON.stringify(data, null, 2));
        }}
        withSubmit
      />
    </MantineProvider>
  );
}

export default Mantine;
