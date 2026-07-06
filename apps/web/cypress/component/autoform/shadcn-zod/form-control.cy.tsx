import { AutoForm as RHFAutoForm } from "@autoform/shadcn/components/ui/autoform/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@autoform/shadcn/components/ui/autoform/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";
import { TestWrapper } from "./utils";

defineExternalFormControlTests({
  label: "SHADCN-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
  Wrapper: TestWrapper,
});
