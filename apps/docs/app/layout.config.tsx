import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import icon from "@/app/icon.png";

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
        <Image src={icon} alt="AutoForm" width={24} height={24} />
        AutoForm
      </div>
    ),
    transparentMode: "top",
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
  githubUrl: "https://github.com/vantezzen/autoform.git",
};
