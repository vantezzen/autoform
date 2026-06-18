import { AutoForm as RHFAutoForm } from "@acp-autoform/chakra/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@acp-autoform/chakra/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";

defineExternalFormControlTests({
  label: "CHAKRA-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
});
