import { defineConfig } from "cypress";

export default defineConfig({
  experimentalRunAllSpecs: true,
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
