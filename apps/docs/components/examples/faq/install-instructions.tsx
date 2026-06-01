import { Tab, Tabs } from "fumadocs-ui/components/tabs";

import { Accordion, Accordions } from "@/components/accordion";
import { CodeBlock } from "@/components/landing/tabs/code-block";
import ModeTab from "@/components/landing/tabs/mode-tabs";

const registryUrl =
  "https://raw.githubusercontent.com/vantezzen/autoform/refs/heads/main/packages/shadcn/registry/autoform.json";

interface InstallInstructionsProps {
  components: string;
  label: string;
}

export function InstallInstructions({
  components,
  label,
}: InstallInstructionsProps) {
  return (
    <Accordions type="single" className="my-6">
      <Accordion title="Installation">
        <Tabs persist items={["shadcn CLI", "manual"]} label={label}>
          <Tab value="shadcn CLI">
            <ModeTab mode="cli" command={`shadcn@latest add ${registryUrl}`} />

            <p className="mt-4">
              Then add the shadcn components used by this example:
            </p>

            <ModeTab mode="cli" command={`shadcn@latest add ${components}`} />
          </Tab>
          <Tab value="manual">
            <p>Install the AutoForm and schema packages:</p>

            <CodeBlock
              lang="bash"
              code="npm install @autoform/react @autoform/zod zod react-hook-form @hookform/resolvers"
            />

            <p className="mt-4">Copy the AutoForm registry files from:</p>

            <CodeBlock lang="txt" code={registryUrl} />

            <p className="mt-4">
              Also install or copy the shadcn {components} component
              {components.includes(" ") ? "s" : ""}.
            </p>
          </Tab>
        </Tabs>
      </Accordion>
    </Accordions>
  );
}
