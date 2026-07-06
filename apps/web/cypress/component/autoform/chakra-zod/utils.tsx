import { AutoForm as ReactHookFormAutoForm } from "@autoform/chakra/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@autoform/chakra/tanstack-form";

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
