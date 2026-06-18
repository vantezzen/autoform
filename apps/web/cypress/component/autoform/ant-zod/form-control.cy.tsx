import { AutoForm as RHFAutoForm } from "@acp-autoform/ant/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@acp-autoform/ant/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";

defineExternalFormControlTests({
  label: "ANT-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
});
