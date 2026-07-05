import { defineConfig } from "tsdown";

export default defineConfig({
  dts: { build: true, cjsReexport: true },
  entry: ["./src/react-hook-form.tsx", "./src/tanstack-form.tsx"],
  format: ["esm", "cjs"],
  outExtensions: ({ format }) =>
    format === "cjs"
      ? { js: ".cjs", dts: ".d.cts" }
      : { js: ".mjs", dts: ".d.mts" },
  deps: {
    dts: {
      neverBundle: ["@autoform/react"],
    },
  },
  treeshake: true,
  clean: true,
  unbundle: true,
});
