import { AutoForm as ReactHookFormAutoForm } from "@acp-autoform/chakra/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@acp-autoform/chakra/tanstack-form";

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
