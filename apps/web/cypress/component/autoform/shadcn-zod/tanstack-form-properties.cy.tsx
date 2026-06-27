import { AutoForm } from "@dual-autoform/shadcn/components/ui/autoform/tanstack-form";
import { defineTanStackFormPropertiesTests } from "../shared/adapter-contracts";
import { TestWrapper } from "./utils";

defineTanStackFormPropertiesTests({
  label: "SHADCN-ZOD",
  AutoForm,
  Wrapper: TestWrapper,
});
