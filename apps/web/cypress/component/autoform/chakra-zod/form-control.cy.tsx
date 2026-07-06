import { AutoForm as RHFAutoForm } from "@autoform/chakra/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@autoform/chakra/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";

defineExternalFormControlTests({
  label: "CHAKRA-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
});
