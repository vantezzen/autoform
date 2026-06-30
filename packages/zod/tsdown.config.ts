import { defineConfig } from "tsdown";

export default defineConfig({
  dts: { build: true },
  entry: ["./src/index.ts"],
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
