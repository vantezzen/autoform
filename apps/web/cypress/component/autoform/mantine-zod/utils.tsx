import { createTheme, MantineProvider } from "@mantine/core";
import { AutoForm as ReactHookFormAutoForm } from "@dual-autoform/mantine/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@dual-autoform/mantine/tanstack-form";
import "@mantine/core/styles.css";

const theme = createTheme({});

export const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);

export const autoFormAdapters = [
  {
    name: "react-hook-form",
    AutoForm: ReactHookFormAutoForm,
  },
  {
    name: "tanstack-form",
    AutoForm: TanStackAutoForm,
  },
];
