"use client";

import dynamic from "next/dynamic";

export const InteractiveSchemaDemo = dynamic(
  () =>
    import("./interactive-schema-demo-content").then(
      (m) => m.InteractiveSchemaDemoContent,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center rounded-lg border bg-background p-12 text-sm text-muted-foreground">
        Loading editor…
      </div>
    ),
  },
);
