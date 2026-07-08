"use client";

import * as React from "react";
import Editor, {
  type BeforeMount,
  type EditorProps,
  type OnMount,
} from "@monaco-editor/react";
import type { SchemaProvider } from "@autoform/core";
import { ZodProvider, type AnyZodObject } from "@autoform/zod";
import { z } from "zod";
import { AutoForm } from "@/components/ui/autoform/react-hook-form";
import { Button } from "@/components/ui/button";

const defaultCode = `const schema = z.object({
  name: z.string()
    .min(2, "Enter at least 2 characters")
    .describe("Name"),
  email: z.string()
    .email("Use a valid email")
    .describe("Email"),
  role: z.enum(["admin", "editor", "viewer"])
    .default("editor")
    .describe("Role"),
  seats: z.coerce.number()
    .int()
    .min(1)
    .default(5)
    .describe("Seats"),
  active: z.boolean()
    .default(true)
    .describe("Active user"),
});

schema`;

const defaultSchema = z.object({
  name: z.string().min(2, "Enter at least 2 characters").describe("Name"),
  email: z.string().email("Use a valid email").describe("Email"),
  role: z
    .enum(["admin", "editor", "viewer"])
    .default("editor")
    .describe("Role"),
  seats: z.coerce.number().int().min(1).default(5).describe("Seats"),
  active: z.boolean().default(true).describe("Active user"),
});

const editorOptions: EditorProps["options"] = {
  automaticLayout: true,
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbersMinChars: 3,
  renderLineHighlight: "none",
  scrollBeyondLastLine: false,
  padding: { top: 16, bottom: 16 },
  folding: false,
  glyphMargin: false,
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
    alwaysConsumeMouseWheel: false,
  },
};

const configureMonaco: BeforeMount = (monaco) => {
  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  });

  monaco.editor.defineTheme("autoformLight", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "7c3aed", fontStyle: "bold" },
      { token: "identifier", foreground: "111827" },
      { token: "string", foreground: "047857" },
      { token: "number", foreground: "b45309" },
      { token: "delimiter", foreground: "52525b" },
      { token: "operator", foreground: "52525b" },
      { token: "type.identifier", foreground: "0369a1" },
    ],
    colors: {
      "editor.background": "#fafafa",
      "editor.foreground": "#18181b",
      "editorLineNumber.foreground": "#a1a1aa",
      "editorCursor.foreground": "#18181b",
      "editor.selectionBackground": "#d4d4d8",
      "editor.inactiveSelectionBackground": "#e4e4e7",
    },
  });
};

const setEditorLanguage: OnMount = (editor, monaco) => {
  const model = editor.getModel();
  if (model) {
    monaco.editor.setModelLanguage(model, "typescript");
  }
};

function parseSchema(code: string): SchemaProvider {
  let schema: unknown;

  try {
    schema = new Function("z", `"use strict"; return (${code});`)(z);
  } catch {
    schema = new Function("z", `"use strict"; ${code}; return schema;`)(z);
  }

  if (!schema || typeof schema !== "object") {
    throw new Error("Return a Zod object from the editor.");
  }

  const provider = new ZodProvider(schema as AnyZodObject);
  provider.parseSchema();
  return provider;
}

export default function InteractiveDemoContent() {
  const [schemaProvider, setSchemaProvider] = React.useState<SchemaProvider>(
    () => new ZodProvider(defaultSchema),
  );
  const [formKey, setFormKey] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState<string | null>(null);

  const updateSchema = React.useCallback((value?: string) => {
    try {
      setSchemaProvider(parseSchema(value || ""));
      setFormKey((key) => key + 1);
      setSubmitted(null);
      setError(null);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Invalid schema");
    }
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="flex flex-col gap-2 border-b border-zinc-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">Live demo</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Edit the Zod schema. The generated form updates when the schema is
            valid.
          </p>
        </div>
        {error ? (
          <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
            {error}
          </span>
        ) : (
          <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
            React Hook Form
          </span>
        )}
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-zinc-200 bg-zinc-50 lg:border-b-0 lg:border-r">
          <div className="border-b border-zinc-200 px-4 py-2 font-mono text-xs text-zinc-500">
            schema.ts
          </div>
          <Editor
            className="h-[420px]"
            beforeMount={configureMonaco}
            defaultValue={defaultCode}
            language="typescript"
            onMount={setEditorLanguage}
            options={editorOptions}
            path="file:///schema.ts"
            theme="autoformLight"
            onChange={updateSchema}
          />
        </div>

        <div className="p-5 sm:p-6">
          <AutoForm
            key={formKey}
            schema={schemaProvider}
            formProps={{ className: "flex flex-col gap-4" }}
            onSubmit={(data) => setSubmitted(JSON.stringify(data, null, 2))}
          >
            <Button
              type="submit"
              className="mt-1 w-full bg-zinc-950 text-white hover:bg-zinc-800 sm:w-auto"
            >
              Submit demo
            </Button>
          </AutoForm>

          {submitted && (
            <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <div className="mb-2 text-xs font-medium uppercase text-zinc-500">
                Submitted value
              </div>
              <pre className="overflow-auto font-mono text-xs leading-5 text-zinc-700">
                {submitted}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
