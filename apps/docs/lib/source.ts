import { docs } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (icon === "TanStackLogo") {
      return createElement(
        "span",
        {
          key: "TanStackLogo",
          "aria-hidden": true,
          className: "inline-flex size-4 shrink-0 items-center justify-center",
        },
        createElement("img", {
          key: "tanstack-light",
          alt: "",
          className: "size-4 object-contain dark:hidden",
          src: "https://tanstack.com/images/logos/logo-black.svg",
        }),
        createElement("img", {
          key: "tanstack-dark",
          alt: "",
          className: "hidden size-4 object-contain dark:block",
          src: "https://tanstack.com/images/logos/logo-white.svg",
        }),
      );
    }

    if (icon && icon in icons)
      return createElement(icons[icon as keyof typeof icons], { key: icon });
  },
});
