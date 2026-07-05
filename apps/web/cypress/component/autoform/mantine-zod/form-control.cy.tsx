import { AutoForm as RHFAutoForm } from "@autoform/mantine/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@autoform/mantine/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";
import { TestWrapper } from "./utils";

defineExternalFormControlTests({
  label: "MANTINE-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
  Wrapper: TestWrapper,
});
