import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ChevronsDown } from "lucide-react";
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        AutoForm
      </div>
    ),
    transparentMode: "top",
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
  githubUrl: "https://github.com/vantezzen/autoform.git",
};
