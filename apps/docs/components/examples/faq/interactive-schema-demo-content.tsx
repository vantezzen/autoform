"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { z } from "zod";
import { ZodProvider } from "@autoform/zod";
import { SchemaProvider } from "@autoform/core";

import { PreviewAutoForm } from "@/components/examples/faq/autoform-preview";

const defaultCode = `z.object({
  name: z.string(),
  age: z.coerce.number(),
  isHuman: z.boolean(),
})`;

const globalZod = z;

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

export function InteractiveSchemaDemoContent() {
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
  const [data, setData] = useState("");

  useEffect(() => {
    try {
      const z = globalZod;
      const parsedSchema = eval(code);
      const provider = new ZodProvider(parsedSchema);
      provider.parseSchema();
      setSchemaProvider(provider);
    } catch (error) {
      console.error(error);
    }
  }, [code]);

  return (
    <div className="grid md:grid-cols-2 gap-1 w-full rounded-lg border bg-background overflow-hidden">
      <div className="bg-muted/40 p-1 md:py-4 md:px-1 border-b md:border-b-0 md:border-r">
        <Editor
          className="md:h-[380px] md:border-0 h-[260px] border"
          options={editorOptions}
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          onChange={(value) => setCode(value || "")}
        />
      </div>

      <div className="p-6 pb-8">
        <PreviewAutoForm
          schema={schemaProvider}
          onSubmit={(data) => setData(JSON.stringify(data, null, 2))}
          withSubmit
        />

        {data && (
          <pre className="bg-muted rounded-md p-4 text-sm mt-4 overflow-auto">
            {data}
          </pre>
        )}
      </div>
    </div>
  );
}
