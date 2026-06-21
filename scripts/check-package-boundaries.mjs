import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const publishedPackages = [
  "core",
  "zod",
  "yup",
  "joi",
  "react",
  "ant",
  "chakra",
  "mantine",
  "mui",
];

for (const packageName of publishedPackages) {
  const packageDir = resolve(`packages/${packageName}`);
  const packageJson = JSON.parse(
    readFileSync(resolve(packageDir, "package.json"), "utf8"),
  );
  const rootExport = packageJson.exports["."];

  assert.equal(packageJson.type, "module", `${packageJson.name} is not ESM-first`);
  assert.match(packageJson.main, /\.cjs$/);
  assert.match(packageJson.module, /\.mjs$/);
  assert.match(rootExport.import.types, /\.d\.ts$/);
  assert.match(rootExport.import.default, /\.mjs$/);
  assert.match(rootExport.require.types, /\.d\.cts$/);
  assert.match(rootExport.require.default, /\.cjs$/);

  for (const target of [
    packageJson.main,
    packageJson.module,
    rootExport.import.types,
    rootExport.require.types,
  ]) {
    assert.equal(
      existsSync(resolve(packageDir, target)),
      true,
      `${packageJson.name} export target is missing: ${target}`,
    );
  }
}

for (const specifier of [
  "@acp-autoform/core",
  "@acp-autoform/zod",
  "@acp-autoform/yup",
  "@acp-autoform/joi",
]) {
  require(specifier);
  await import(specifier);
}

const root = require("@acp-autoform/react");
const rhf = require("@acp-autoform/react/react-hook-form");
const tanstack = require("@acp-autoform/react/tanstack-form");

assert.equal(root.AutoFormProvider, rhf.AutoFormProvider, "RHF CJS duplicated AutoFormContext");
assert.equal(
  root.AutoFormProvider,
  tanstack.AutoFormProvider,
  "TanStack CJS duplicated AutoFormContext",
);

const [esmRoot, esmRhf, esmTanstack] = await Promise.all([
  import("@acp-autoform/react"),
  import("@acp-autoform/react/react-hook-form"),
  import("@acp-autoform/react/tanstack-form"),
]);

assert.equal(esmRoot.AutoFormProvider, esmRhf.AutoFormProvider, "RHF ESM duplicated AutoFormContext");
assert.equal(
  esmRoot.AutoFormProvider,
  esmTanstack.AutoFormProvider,
  "TanStack ESM duplicated AutoFormContext",
);

const reactDist = resolve("packages/react/dist");
const legacyRhfDist = resolve(reactDist, "rhf");
assert.equal(
  existsSync(legacyRhfDist) && readdirSync(legacyRhfDist).length > 0,
  false,
  "stale dist/rhf files were packed",
);

const rhfEntry = readFileSync(resolve(reactDist, "react-hook-form/index.mjs"), "utf8");
const tanstackEntry = readFileSync(resolve(reactDist, "tanstack-form/index.mjs"), "utf8");
assert.equal(rhfEntry.includes("@tanstack/react-form"), false, "RHF entry imports TanStack Form");
assert.equal(tanstackEntry.includes('from "react-hook-form"'), false, "TanStack entry imports RHF");

for (const packageName of ["ant", "chakra", "mantine", "mui"]) {
  const dist = resolve(`packages/${packageName}/dist`);
  const rhfUiEntry = readFileSync(resolve(dist, "react-hook-form.mjs"), "utf8");
  const tanstackUiEntry = readFileSync(resolve(dist, "tanstack-form.mjs"), "utf8");
  const rhfTypes = readFileSync(resolve(dist, "react-hook-form.d.ts"), "utf8");
  const tanstackTypes = readFileSync(resolve(dist, "tanstack-form.d.ts"), "utf8");

  assert.match(rhfUiEntry, /@acp-autoform\/react\/react-hook-form/);
  assert.doesNotMatch(rhfUiEntry, /@acp-autoform\/react\/tanstack-form/);
  assert.match(tanstackUiEntry, /@acp-autoform\/react\/tanstack-form/);
  assert.doesNotMatch(tanstackUiEntry, /@acp-autoform\/react\/react-hook-form/);
  assert.match(rhfTypes, /<T extends Record<string, any>/);
  assert.match(tanstackTypes, /<T extends Record<string, any>/);
}

console.log("Package boundary checks passed for ESM and CommonJS.");
