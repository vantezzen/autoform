import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/index.ts", "./src/v4", "./src/v4-mini"],
	format: ["cjs", "esm"],
	dts: true,
});
