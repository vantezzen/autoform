import { defineConfig } from "tsdown";

export default defineConfig({
  dts: { build: true },
  entry: [
    "./src/index.tsx",
    "./src/react-hook-form/index.ts",
    "./src/tanstack-form/index.ts",
  ],
  format: ["esm"],
  deps: {
    dts: {
      neverBundle: ["@dual-autoform/core"],
    },
  },
  treeshake: true,
  clean: true,
  unbundle: true,
});
