import { readFile, writeFile } from "fs/promises";
import { z } from "zod/v3";
import { registryEntrySchema } from "./schema";
import { readdir } from "fs/promises";
import { join } from "path";

console.log("Building registry...");

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = join(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return files.flat() as string[];
}

// Common shadcn UI component dependencies used by both adapters.
const commonRegistryDeps = [
  "alert",
  "button",
  "calendar",
  "checkbox",
  "input",
  "label",
  "popover",
  "select",
];

// Paths (forward-slashed) that belong exclusively to one adapter.
function isRHFOnly(path: string) {
  return (
    path.includes("components/tanstack/") || path.includes("tanstack-form.tsx")
  );
}
function isTanStackOnly(path: string) {
  return (
    path.includes("components/rhf/") || path.includes("react-hook-form.tsx")
  );
}

// Files that are removed in the split (bridging layer).
function isRemoved(path: string) {
  return path.includes("field-context.ts");
}

async function buildRegistryItem(
  name: string,
  dependencies: string[],
  excludeFn: (path: string) => boolean,
) {
  const adapter = name === "autoform-rhf" ? "react-hook-form" : "tanstack-form";
  const registry: z.infer<typeof registryEntrySchema> = {
    name,
    type: "registry:ui",
    registryDependencies: commonRegistryDeps,
    dependencies,
    devDependencies: [],
    tailwind: { config: {} },
    cssVars: {},
    files: [],
  };

  const files = await getFiles(`./src/components/ui/autoform`);
  for (const file of files) {
    const normalizedPath = file.replace(/\\/g, "/");

    // Skip files that belong to the other adapter or are removed.
    if (excludeFn(normalizedPath) || isRemoved(normalizedPath)) continue;

    let content = await readFile(file, "utf-8");
    content = content.replace(/\r\n/g, "\n");

    const pathKey = normalizedPath.replace("src/components/ui/", "");
    const targetKey = normalizedPath.replace("src/", "");

    registry.files!.push({
      path: pathKey,
      target: targetKey,
      content,
      type: "registry:ui",
    });
  }

  registry.files!.push({
    path: "autoform/index.ts",
    target: "components/ui/autoform/index.ts",
    content: `"use client";\n\nexport { AutoForm } from "./${adapter}";\nexport type { AutoFormProps, FieldTypes } from "./${adapter}";\n`,
    type: "registry:ui",
  });

  await writeFile(`./registry/${name}.json`, JSON.stringify(registry, null, 2));
}

// Build RHF registry: exclude TanStack-only files.
await buildRegistryItem(
  "autoform-rhf",
  [
    "zod",
    "@dual-autoform/zod",
    "@dual-autoform/react",
    "react-hook-form",
    "@hookform/resolvers",
    "lucide-react",
  ],
  isRHFOnly,
);

// Build TanStack registry: exclude RHF-only files.
await buildRegistryItem(
  "autoform-tanstack",
  [
    "zod",
    "@dual-autoform/zod",
    "@dual-autoform/react",
    "@tanstack/react-form",
    "lucide-react",
  ],
  isTanStackOnly,
);

console.log("Registry built!");
