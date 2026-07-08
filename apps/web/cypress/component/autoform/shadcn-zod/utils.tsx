import "@autoform/shadcn/globals.css";
import { AutoForm as ReactHookFormAutoForm } from "@autoform/shadcn/components/ui/autoform/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@autoform/shadcn/components/ui/autoform/tanstack-form";

export const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

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
