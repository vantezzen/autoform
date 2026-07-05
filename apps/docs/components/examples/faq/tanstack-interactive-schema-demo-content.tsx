"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { z } from "zod";
import { ZodProvider } from "@autoform/zod";
import type { SchemaProvider } from "@autoform/core";

import { AutoForm } from "@/components/ui/autoform/tanstack-form";

const editorOptions = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineNumbersMinChars: 2,
  glyphMargin: false,
  folding: false,
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
    alwaysConsumeMouseWheel: false,
  },
};

const getEditorTheme = () =>
  typeof document === "undefined"
    ? "light"
    : document.documentElement.classList.contains("dark")
      ? "vs-dark"
      : "light";

function useEditorTheme() {
  const [theme, setTheme] = useState(getEditorTheme);
  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getEditorTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return theme;
}

const defaultCode = `z.object({
  name: z.string(),
  age: z.coerce.number(),
  isHuman: z.boolean(),
})`;

const globalZod = z;

export default function TanStackInteractiveSchemaDemoContent() {
  const [code, setCode] = React.useState(defaultCode);
  const [schemaProvider, setSchemaProvider] = React.useState<SchemaProvider>(
    () =>
      new ZodProvider(
        z.object({
          name: z.string(),
          age: z.coerce.number(),
          isHuman: z.boolean(),
        }),
      ),
  );
  const [formKey, setFormKey] = React.useState(0);
  const [data, setData] = useState("");
  const editorTheme = useEditorTheme();

  useEffect(() => {
    try {
      const z = globalZod;
      const parsedSchema = eval(code);
      const provider = new ZodProvider(parsedSchema);
      provider.parseSchema();
      setSchemaProvider(provider);
      setFormKey((key) => key + 1);
    } catch (error) {
      console.error(error);
    }
  }, [code]);

  return (
    <div className="grid w-full gap-1 overflow-hidden rounded-lg border bg-background md:grid-cols-2">
      <div className="border-b bg-muted/40 p-1 md:border-b-0 md:border-r md:px-1 md:py-4">
        <Editor
          className="h-65 border md:h-95 md:border-0"
          options={editorOptions}
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          theme={editorTheme}
          onChange={(value) => setCode(value || "")}
        />
      </div>

      <div className="p-6 pb-8">
        <AutoForm
          key={formKey}
          schema={schemaProvider}
          onSubmit={(data) => setData(JSON.stringify(data, null, 2))}
          withSubmit
        />

        {data && (
          <pre className="mt-4 overflow-auto rounded-md bg-muted p-4 text-sm">
            {data}
          </pre>
        )}
      </div>
    </div>
  );
}
