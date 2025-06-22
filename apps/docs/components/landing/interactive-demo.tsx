"use client";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { z } from "zod";
import { AutoForm } from "@autoform/mui";
import { SchemaProvider } from "@autoform/core";
import { ZodProvider } from "@autoform/zod";

const defaultCode = `z.object({
  name: z.string(),
  age: z.coerce.number(),
  isHuman: z.boolean(),
})`;
const globalZod = z;

const editorOptions = {
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  scrollbar: {
    useShadows: false,
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
    alwaysConsumeMouseWheel: false,
  },
};

function InteractiveDemo() {
  const [code, setCode] = React.useState(defaultCode);
  const [schema, setSchema] = React.useState<z.ZodObject<any, any>>(
    z.object({
      name: z.string(),
      age: z.coerce.number(),
      isHuman: z.boolean(),
    })
  );
  const [schemaProvider, setSchemaProvider] = React.useState<SchemaProvider>(
    () => new ZodProvider(schema)
  );
  const [data, setData] = useState("");

  useEffect(() => {
    try {
      const z = globalZod;
      const parsedSchema = eval(code);
      const provider = new ZodProvider(parsedSchema);
      provider.parseSchema();
      setSchema(parsedSchema);
      setSchemaProvider(provider);
    } catch (error) {
      console.error(error);
    }
  }, [code]);

  return (
    <div className="grid md:grid-cols-2 gap-3 w-full">
      <div className="bg-white rounded-lg md:p-6">
        <Editor
          className="md:h-[600px] md:border-0 h-[300px] border"
          options={editorOptions}
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          onChange={(value) => setCode(value || "")}
        />
      </div>

      <div className="bg-white rounded-lg p-6">
        <AutoForm
          schema={schemaProvider}
          onSubmit={(data) => setData(JSON.stringify(data, null, 2))}
          withSubmit
        />

        {data && (
          <pre className="bg-gray-100 p-4 rounded-lg text-sm mt-4 text-gray-800">
            {data}
          </pre>
        )}
      </div>
    </div>
  );
}

export default InteractiveDemo;
