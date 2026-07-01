import { defineConfig } from "tsdown";

export default defineConfig({
  dts: { build: true },
  entry: ["./src/react-hook-form.tsx", "./src/tanstack-form.tsx"],
  format: ["esm"],
  platform: "browser",
  outExtensions: () => ({ js: ".mjs", dts: ".d.mts" }),
  deps: {
    dts: {
      neverBundle: ["@dual-autoform/react"],
    },
  },
  treeshake: true,
  clean: true,
  unbundle: true,
});
