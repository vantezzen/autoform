import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.tsx",
    "react-hook-form/index": "src/react-hook-form/index.ts",
    "tanstack-form/index": "src/tanstack-form/index.ts",
  },
  format: ["esm", "cjs"],
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".cjs" };
  },
  dts: true,
  clean: true,
  sourcemap: true,
  external: ["@dual-autoform/react"],
});
