"use client";

import dynamic from "next/dynamic";

export const InteractiveSchemaDemo = dynamic(
  () =>
    import("./interactive-schema-demo-content").then(
      (m) => m.InteractiveSchemaDemoContent,
    ),
  { ssr: false },
);
