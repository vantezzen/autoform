"use client";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
// import { AutoForm } from "@acp-autoform/mui/react-hook-form";
import { z } from "zod";
import { SchemaProvider } from "@acp-autoform/core";
import { ZodProvider } from "@acp-autoform/zod";
import { AutoForm } from "@/components/ui/autoform";

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

const getEditorTheme = () =>
  document.documentElement.classList.contains("dark") ? "vs-dark" : "light";

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

function InteractiveDemoContent() {
  const [code, setCode] = React.useState(defaultCode);
  const [schema, setSchema] = React.useState<z.ZodObject<any, any>>(
    z.object({
      name: z.string(),
      age: z.coerce.number(),
      isHuman: z.boolean(),
    }),
  );
  const [schemaProvider, setSchemaProvider] = React.useState<SchemaProvider>(
    () => new ZodProvider(schema),
  );
  const [formKey, setFormKey] = React.useState(0);
  const [data, setData] = useState("");
  const editorTheme = useEditorTheme();

  useEffect(() => {
    try {
      const z = globalZod;
      void z;
      const parsedSchema = eval(code);
      const provider = new ZodProvider(parsedSchema);
      provider.parseSchema();
      setSchema(parsedSchema);
      setSchemaProvider(provider);
      setFormKey((k) => k + 1);
    } catch (error) {
      console.error(error);
    }
  }, [code]);

  return (
    <div className="grid md:grid-cols-2 gap-1 w-full rounded-lg border bg-background overflow-hidden">
      <div className="bg-muted/40 p-1 md:py-6 md:px-1 border-b md:border-b-0 md:border-r">
        <Editor
          className="md:h-[500px] md:border-0 h-[310px] border"
          options={editorOptions}
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          theme={editorTheme}
          onChange={(value) => setCode(value || "")}
        />
      </div>

      <div className="p-6 pb-20 md:pb-24">
        <AutoForm
          key={formKey}
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

export default InteractiveDemoContent;
