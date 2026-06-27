import { AutoForm as RHFAutoForm } from "@dual-autoform/mui/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@dual-autoform/mui/tanstack-form";
import { defineExternalFormControlTests } from "../shared/adapter-contracts";

defineExternalFormControlTests({
  label: "MUI-ZOD",
  RHFAutoForm,
  TanStackAutoForm,
});
