import { readFile, writeFile } from "fs/promises";
import { z } from "zod/v3";
import { registryEntrySchema } from "./schema";
import { readdir } from "fs/promises";
import { join } from "path";

console.log("Building registry...");

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = join(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return files.flat() as string[];
}

const registry: z.infer<typeof registryEntrySchema> = {
  name: "AutoForm",
  type: "registry:ui",
  registryDependencies: [
    "alert",
    "button",
    "calendar",
    "card",
    "checkbox",
    "form",
    "input",
    "label",
    "select",
    "skeleton",
    "switch",
    "textarea",
    "toggle",
  ],
  dependencies: ["zod", "@acp-autoform/react"],
  devDependencies: [],
  tailwind: {
    config: {},
  },
  cssVars: {},
  files: [],
};

const files = await getFiles(`./src/components/ui/autoform`);
for (const file of files) {
  let content = await readFile(file, "utf-8");
  // Normalize line endings to LF only (remove carriage returns)
  content = content.replace(/\r\n/g, "\n");
  // Normalize paths to use forward slashes for cross-platform compatibility
  const normalizedPath = file
    .replace(/\\/g, "/")
    .replace("src/components/ui/", "");
  const normalizedTarget = file.replace(/\\/g, "/").replace("src/", "");
  registry.files!.push({
    path: normalizedPath,
    target: normalizedTarget,
    content,
    type: "registry:ui",
  });
}

await writeFile("./registry/autoform.json", JSON.stringify(registry, null, 2));

console.log("Registry built!");
