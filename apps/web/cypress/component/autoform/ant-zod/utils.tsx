import { AutoForm as ReactHookFormAutoForm } from "@autoform/ant/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@autoform/ant/tanstack-form";

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
