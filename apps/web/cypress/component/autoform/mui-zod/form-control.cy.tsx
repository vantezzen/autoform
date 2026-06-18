import { AutoForm as RHFAutoForm } from "@acp-autoform/mui/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@acp-autoform/mui/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";

defineExternalFormControlTests({
  label: "MUI-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
});
