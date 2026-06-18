import { AutoForm as ReactHookFormAutoForm } from "@acp-autoform/mui/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@acp-autoform/mui/tanstack-form";

export const autoFormAdapters = [
  {
    name: "react-hook-form",
    AutoForm: ReactHookFormAutoForm,
  },
  {
    name: "tanstack-form",
    AutoForm: TanStackAutoForm,
  },
];
