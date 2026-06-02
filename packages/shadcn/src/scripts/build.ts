import { readFile, writeFile } from "fs/promises";
import { z } from "zod/v3";
import { registryEntrySchema } from "./schema";
import { glob } from "glob";

console.log("Building registry...");

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

const files = await glob(`./src/components/ui/autoform/**/*`, { nodir: true });
for (const file of files) {
  let content = await readFile(file, "utf-8");
  // Normalize line endings to LF only (remove carriage returns)
  content = content.replace(/\r\n/g, "\n");
  // Normalize paths to use forward slashes for cross-platform compatibility
  const normalizedPath = file.replace(/\\/g, "/").replace("src/components/ui/", "");
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
