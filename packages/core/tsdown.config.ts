import { defineConfig } from "tsdown";

export default defineConfig({
  dts: { build: true, cjsReexport: true },
  entry: ["./src/index.ts"],
  format: ["esm", "cjs"],
  outExtensions: ({ format }) =>
    format === "cjs"
      ? { js: ".cjs", dts: ".d.cts" }
      : { js: ".mjs", dts: ".d.mts" },
  treeshake: true,
  clean: true,
  unbundle: true,
});
