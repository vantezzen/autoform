import { AutoForm } from "@acp-autoform/mantine/tanstack-form";
import { defineTanStackFormPropertiesTests } from "../shared/adapter-contracts";
import { TestWrapper } from "./utils";

defineTanStackFormPropertiesTests({
  label: "MANTINE-ZOD",
  AutoForm,
  Wrapper: TestWrapper,
});
