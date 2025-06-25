import { Tab, Tabs, TabsProps, TabsContent } from "fumadocs-ui/components/tabs";
import { CodeBlock } from "./code-block";

type content = {
  value: string;
  content: string;
}[];

function getPackage(pkg: string): content {
  return [
    { value: "npm", content: `npm install ${pkg}` },
    { value: "pnpm", content: `pnpm add ${pkg}` },
    { value: "yarn", content: `yarn add ${pkg}` },
    { value: "bun", content: `bun add ${pkg}` },
  ];
}

function getCli(pkg: string): content {
  return [
    { value: "npm", content: `npx ${pkg}` },
    { value: "pnpm", content: `pnpm dlx ${pkg}` },
    { value: "yarn", content: `yarn ${pkg}` },
    { value: "bun", content: `bunx --bun ${pkg}` },
  ];
}

interface ModeTabProps extends TabsProps {
  mode?: "cli" | "package";
  command: string;
}
export default function ModeTab({
  mode = "package",
  command,
  ...props
}: ModeTabProps) {
  const data = mode === "package" ? getPackage(command) : getCli(command);
  return (
    <Tabs
      persist
      groupId="package-manager"
      items={["npm", "pnpm", "yarn", "bun"]}
      {...props}
    >
      {data.map((item) => (
        <Tab key={item.value} value={item.value}>
          <CodeBlock code={item.content} lang="bash" />
        </Tab>
      ))}
    </Tabs>
  );
}
