import { readFile, writeFile } from "fs/promises";
import { join } from "path";

type RegistryFile = {
  path: string;
  target?: string;
  type: string;
};

type RegistryItem = {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
};

type Registry = {
  $schema?: string;
  name: string;
  homepage?: string;
  items: RegistryItem[];
};

const root = join(process.cwd(), "../..");
const sourceRegistryPath = join(root, "registry.json");
const outputDir = join(process.cwd(), "registry");
const outputRegistryPath = join(outputDir, "registry.json");
const itemSchema = "https://ui.shadcn.com/schema/registry-item.json";

const registry = JSON.parse(
  await readFile(sourceRegistryPath, "utf8"),
) as Registry;

const generatedRegistry = JSON.parse(
  await readFile(outputRegistryPath, "utf8"),
) as Registry;

const localReactItems = registry.items.filter(
  (item) =>
    item.type === "registry:lib" && item.name.startsWith("autoform-react-"),
);

for (const item of localReactItems) {
  const files = await Promise.all(
    (item.files ?? []).map(async (file) => {
      let content = await readFile(join(root, file.path), "utf8");

      if (
        file.path.includes("/react-hook-form/") ||
        file.path.includes("/tanstack-form/")
      ) {
        content = content
          .replace(
            'export * from "@acp-autoform/react";',
            'export * from "../types";\nexport * from "../context";',
          )
          .replaceAll('from "@acp-autoform/react"', 'from "../context"');
      }

      return {
        ...file,
        content: content.replace(/\r\n/g, "\n"),
      };
    }),
  );

  const outputItem = {
    $schema: itemSchema,
    ...item,
    files,
  };

  await writeFile(
    join(outputDir, `${item.name}.json`),
    `${JSON.stringify(outputItem, null, 2)}\n`,
  );
}

const generatedNames = new Set(
  generatedRegistry.items.map((item) => item.name),
);
const missingItems = localReactItems.filter(
  (item) => !generatedNames.has(item.name),
);

if (missingItems.length > 0) {
  generatedRegistry.items = [...missingItems, ...generatedRegistry.items];
  await writeFile(
    outputRegistryPath,
    `${JSON.stringify(generatedRegistry, null, 2)}\n`,
  );
}

console.log(
  `Built ${localReactItems.length} local React adapter registry item(s).`,
);
