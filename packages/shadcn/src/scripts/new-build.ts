import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

console.log("Building example registries...");

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptDir, "../..");
const repoRoot = path.resolve(packageDir, "../..");

const AUTOFORM_REGISTRY_URL =
  "https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/autoform.json";

type RegistryFile = {
  source: string;
  path: string;
  target: string;
  replacements?: Array<[string | RegExp, string]>;
};

type RegistryExample = {
  name: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
};

const previewAutoFormReplacements: RegistryFile["replacements"] = [
  [
    /import \{ PreviewAutoForm \} from "@\/components\/examples\/faq\/autoform-preview";\n+/g,
    'import { AutoForm } from "@/components/ui/autoform";\n',
  ],
  [/\bPreviewAutoForm\b/g, "AutoForm"],
];

const examples: RegistryExample[] = [
  {
    name: "dialog-submit-demo",
    title: "Dialog Submit Demo",
    description:
      "Demonstrates submitting and resetting AutoForm from buttons inside a Dialog using useFormContext and createFormControl.",
    dependencies: [
      "zod",
      "@autoform/zod",
      "react-hook-form",
      "@hookform/resolvers",
      "lucide-react",
      "class-variance-authority",
    ],
    registryDependencies: ["button", "dialog", AUTOFORM_REGISTRY_URL],
    files: [
      {
        source:
          "apps/docs/components/examples/faq/external-dialog-submit-demo.tsx",
        path: "dialog-submit-demo.tsx",
        target: "components/dialog-submit-demo.tsx",
        replacements: previewAutoFormReplacements,
      },
      {
        source:
          "apps/docs/components/examples/faq/external-dialog-form-control-demo.tsx",
        path: "dialog-form-control-demo.tsx",
        target: "components/dialog-form-control-demo.tsx",
        replacements: previewAutoFormReplacements,
      },
    ],
  },
  {
    name: "realtime-validation-demo",
    title: "Realtime Validation Demo",
    description:
      "Shows real-time form validation with a disabled submit button until all fields are valid.",
    dependencies: [
      "zod",
      "@autoform/zod",
      "react-hook-form",
      "@hookform/resolvers",
    ],
    registryDependencies: ["button", AUTOFORM_REGISTRY_URL],
    files: [
      {
        source:
          "apps/docs/components/examples/faq/realtime-validation-demo.tsx",
        path: "realtime-validation-demo.tsx",
        target: "components/realtime-validation-demo.tsx",
        replacements: previewAutoFormReplacements,
      },
    ],
  },
  {
    name: "multistep-form-demo",
    title: "Multistep Form Demo",
    description:
      "A multi-step form with per-step validation, breadcrumb navigation, and collected submission.",
    dependencies: [
      "zod",
      "@autoform/zod",
      "react-hook-form",
      "@hookform/resolvers",
      "lucide-react",
    ],
    registryDependencies: ["button", AUTOFORM_REGISTRY_URL],
    files: [
      {
        source: "apps/docs/components/examples/faq/multistep-form.tsx",
        path: "multistep-form.tsx",
        target: "components/multistep-form.tsx",
        replacements: previewAutoFormReplacements,
      },
      {
        source:
          "apps/docs/components/examples/faq/multistep-form-usage-demo.tsx",
        path: "multistep-form-usage.tsx",
        target: "components/multistep-form-usage.tsx",
        replacements: [
          [
            /@\/components\/examples\/faq\/multistep-form/g,
            "@/components/multistep-form",
          ],
        ],
      },
    ],
  },
  {
    name: "nested-autoform-demo",
    title: "Nested AutoForm Demo",
    description:
      "Shows how to use a nested AutoForm inside a Dialog as a custom field component.",
    dependencies: [
      "zod",
      "@autoform/zod",
      "@autoform/react",
      "react-hook-form",
      "@hookform/resolvers",
    ],
    registryDependencies: ["button", "dialog", AUTOFORM_REGISTRY_URL],
    files: [
      {
        source: "apps/docs/components/examples/faq/nested-autoform-demo.tsx",
        path: "nested-autoform-demo.tsx",
        target: "components/nested-autoform-demo.tsx",
        replacements: previewAutoFormReplacements,
      },
    ],
  },
  {
    name: "interactive-schema-demo",
    title: "Interactive Schema Demo",
    description:
      "A dynamic form builder combining Monaco Editor with AutoForm for interactive, real-time form generation from a Zod schema string.",
    dependencies: [
      "zod",
      "@autoform/zod",
      "@autoform/core",
      "@autoform/react",
      "react-hook-form",
      "@hookform/resolvers",
      "@monaco-editor/react",
    ],
    registryDependencies: [AUTOFORM_REGISTRY_URL],
    files: [
      {
        source:
          "apps/docs/components/examples/faq/interactive-schema-demo-content.tsx",
        path: "interactive-schema-demo.tsx",
        target: "components/interactive-schema-demo.tsx",
        replacements: previewAutoFormReplacements,
      },
    ],
  },
];

function applyReplacements(
  content: string,
  replacements: RegistryFile["replacements"],
) {
  return (
    replacements?.reduce(
      (nextContent, [search, replacement]) =>
        nextContent.replace(search, replacement),
      content,
    ) ?? content
  );
}

for (const example of examples) {
  const files = await Promise.all(
    example.files.map(async (file) => {
      const sourcePath = path.resolve(repoRoot, file.source);
      const source = await readFile(sourcePath, "utf-8");
      const content = applyReplacements(
        source.replace(/\r\n/g, "\n"),
        file.replacements,
      );

      return {
        path: file.path,
        target: file.target,
        content,
        type: "registry:component",
      };
    }),
  );

  await writeFile(
    path.join(packageDir, "registry", `${example.name}.json`),
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: example.name,
        type: "registry:block",
        title: example.title,
        description: example.description,
        dependencies: example.dependencies,
        devDependencies: [],
        registryDependencies: example.registryDependencies,
        files,
        cssVars: {},
        css: "",
        docs: "",
        categories: [],
        meta: {},
      },
      null,
      2,
    ),
  );
}

console.log("Example registries built!");
