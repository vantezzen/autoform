import { AutoForm as RHFAutoForm } from "@autoform/mui/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@autoform/mui/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";

defineExternalFormControlTests({
  label: "MUI-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
});
