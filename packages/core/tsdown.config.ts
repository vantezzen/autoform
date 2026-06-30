import { defineConfig } from "tsdown";

export default defineConfig({
  dts: { build: true },
  entry: ["./src/index.ts"],
  format: ["esm"],
  treeshake: true,
  clean: true,
  unbundle: true,
});
