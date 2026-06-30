import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "react-hook-form": "src/react-hook-form.tsx",
    "tanstack-form": "src/tanstack-form.tsx",
  },
  format: ["esm", "cjs"],
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".cjs" };
  },
  dts: true,
  clean: true,
  sourcemap: true,
});
