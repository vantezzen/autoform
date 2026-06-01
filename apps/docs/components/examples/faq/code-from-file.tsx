import path from "path";
import { readFile } from "fs/promises";

import { CodeBlock } from "@/components/landing/tabs/code-block";

interface CodeFromFileProps {
  file: string;
  lang: string;
}

export async function CodeFromFile({ file, lang }: CodeFromFileProps) {
  const root = process.cwd();
  const rootWithSep = root.endsWith(path.sep) ? root : `${root}${path.sep}`;
  const resolved = path.resolve(root, file);

  if (!resolved.toLowerCase().startsWith(rootWithSep.toLowerCase())) {
    throw new Error(`Invalid code file path: ${file}`);
  }

  const code = await readFile(resolved, "utf8");

  return <CodeBlock code={code} lang={lang} />;
}
