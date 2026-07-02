import { Tab, Tabs } from "fumadocs-ui/components/tabs";

import { Accordion, Accordions } from "@/components/accordion";
import { CodeFromFile } from "@/components/examples/faq/code-from-file";
import ModeTab from "@/components/landing/tabs/mode-tabs";

interface CodeFile {
  /** Path relative to the docs app root, e.g. "components/examples/faq/demo.tsx" */
  path: string;
  /** Display label for the file, e.g. "demo.tsx" */
  label: string;
}

interface InstallInstructionsProps {
  /** Full URL to the per-example registry JSON file */
  registryUrl: string;
  /** Files to show in the manual copy-paste section */
  codeFiles: CodeFile[];
  /** Accessibility label for the Tabs component */
  label: string;
  /** Adapter-specific getting started guide */
  guideHref: string;
}

export function InstallInstructions({
  registryUrl,
  codeFiles,
  label,
  guideHref,
}: InstallInstructionsProps) {
  return (
    <Accordions type="single" className="my-6">
      <Accordion title="Installation">
        <Tabs persist items={["CLI", "Manual"]} label={label}>
          <Tab value="CLI">
            <ModeTab mode="cli" command={`shadcn@latest add ${registryUrl}`} />
          </Tab>
          <Tab value="Manual">
            <div className="fd-steps [&_h3]:fd-step">
              <h3>Install AutoForm</h3>
              <p>
                Set up AutoForm in your project by following the{" "}
                <a href={guideHref}>Getting Started</a> guide.
              </p>

              <h3>Copy and paste the following code into your project</h3>
              {codeFiles.map((file) => (
                <details key={file.path} className="my-2">
                  <summary className="cursor-pointer text-sm font-medium">
                    {file.label}
                  </summary>
                  <CodeFromFile file={file.path} lang="tsx" />
                </details>
              ))}

              <h3>Update the import paths to match your project setup</h3>
            </div>
          </Tab>
        </Tabs>
      </Accordion>
    </Accordions>
  );
}
