import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.tsx",
    "react-hook-form": "src/react-hook-form.tsx",
    "tanstack-form": "src/tanstack-form.tsx",
  },
  format: ["esm", "cjs"],
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".cjs" };
  },
  dts: false,
  clean: true,
  sourcemap: true,
});
