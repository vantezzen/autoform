import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({});

export const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);
