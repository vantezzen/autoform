/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@acp-autoform/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
};
