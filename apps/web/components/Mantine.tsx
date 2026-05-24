import { createTheme, MantineProvider } from "@mantine/core";
import { AutoForm } from "@autoform/mantine";
import { zodSchemaProvider } from "./utils";
import "@mantine/core/styles.css";
import { createFormControl } from "react-hook-form";

function Mantine() {
  const theme = createTheme({});
  const form = createFormControl({ shouldFocusError: false });
  console.log(form);
  return (
    <MantineProvider theme={theme}>
      <AutoForm
        form={form}
        schema={zodSchemaProvider}
        onSubmit={(data) => {
          console.log(JSON.stringify(data, null, 2));
        }}
        withSubmit
      />
      <button onClick={() => form.setValue("username", "wow")}>
        Set Username
      </button>
    </MantineProvider>
  );
}

export default Mantine;
