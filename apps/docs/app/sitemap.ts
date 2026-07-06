import { absoluteUrl } from "@/lib/discovery";
import { source } from "@/lib/source";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...source.getPages().map((page) => page.url)].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
