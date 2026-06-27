import { AutoForm as RHFAutoForm } from "@dual-autoform/ant/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@dual-autoform/ant/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";

defineExternalFormControlTests({
  label: "ANT-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
});
