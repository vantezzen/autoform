import { AutoForm as RHFAutoForm } from "@dual-autoform/mantine/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@dual-autoform/mantine/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";
import { TestWrapper } from "./utils";

defineExternalFormControlTests({
  label: "MANTINE-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
  Wrapper: TestWrapper,
});
