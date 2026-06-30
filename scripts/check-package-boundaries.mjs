import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const rootPackages = ["core", "zod", "yup", "joi", "react"];
const uiPackages = ["ant", "chakra", "mantine", "mui"];

function readPackageJson(packageName) {
  const packageDir = resolve(`packages/${packageName}`);
  const packageJson = JSON.parse(
    readFileSync(resolve(packageDir, "package.json"), "utf8"),
  );
  return { packageDir, packageJson };
}

function assertExportTarget(packageDir, packageName, target) {
  assert.equal(
    existsSync(resolve(packageDir, target)),
    true,
    `${packageName} export target is missing: ${target}`,
  );
}

function assertSimpleExport(packageDir, packageName, exportPath, exportTarget) {
  assert.match(exportTarget.import.types, /\.d\.ts$/);
  assert.match(exportTarget.import.default, /\.mjs$/);
  assert.match(exportTarget.require.types, /\.d\.cts$/);
  assert.match(exportTarget.require.default, /\.cjs$/);

  for (const target of [
    exportTarget.import.types,
    exportTarget.import.default,
    exportTarget.require.types,
    exportTarget.require.default,
  ]) {
    assertExportTarget(packageDir, `${packageName}${exportPath}`, target);
  }
}

for (const packageName of rootPackages) {
  const { packageDir, packageJson } = readPackageJson(packageName);

  assert.equal(packageJson.type, "module", `${packageJson.name} is not ESM-first`);
  assert.match(packageJson.main, /\.cjs$/);
  assert.match(packageJson.module, /\.mjs$/);
  assert.match(packageJson.types, /\.d\.ts$/);
  assertSimpleExport(packageDir, packageJson.name, "", packageJson.exports["."]);
}

for (const packageName of uiPackages) {
  const { packageDir, packageJson } = readPackageJson(packageName);

  assert.equal(packageJson.type, "module", `${packageJson.name} is not ESM-first`);
  assert.equal(
    packageJson.exports["."],
    undefined,
    `${packageJson.name} should not expose a root AutoForm export`,
  );
  assertSimpleExport(
    packageDir,
    packageJson.name,
    "/react-hook-form",
    packageJson.exports["./react-hook-form"],
  );
  assertSimpleExport(
    packageDir,
    packageJson.name,
    "/tanstack-form",
    packageJson.exports["./tanstack-form"],
  );
}

for (const specifier of [
  "@dual-autoform/core",
  "@dual-autoform/zod",
  "@dual-autoform/yup",
  "@dual-autoform/joi",
  "@dual-autoform/react",
  "@dual-autoform/react/react-hook-form",
  "@dual-autoform/react/tanstack-form",
]) {
  const packageName = specifier.split("/")[1];
  const packageRequire = createRequire(
    resolve(`packages/${packageName}/package.json`),
  );
  packageRequire(specifier);
  await import(pathToFileURL(packageRequire.resolve(specifier)).href);
}

const reactDist = resolve("packages/react/dist");
for (const staleDir of ["react-hook-form", "tanstack-form"]) {
  assert.equal(
    existsSync(resolve(reactDist, staleDir)),
    false,
    `stale packages/react/dist/${staleDir} directory was packed`,
  );
}

const rhfEntry = readFileSync(resolve(reactDist, "react-hook-form.mjs"), "utf8");
const tanstackEntry = readFileSync(resolve(reactDist, "tanstack-form.mjs"), "utf8");
assert.equal(rhfEntry.includes("@tanstack/react-form"), false, "RHF entry imports TanStack Form");
assert.equal(tanstackEntry.includes('from "react-hook-form"'), false, "TanStack entry imports RHF");

for (const packageName of uiPackages) {
  const dist = resolve(`packages/${packageName}/dist`);
  const rhfUiEntry = readFileSync(resolve(dist, "react-hook-form.mjs"), "utf8");
  const tanstackUiEntry = readFileSync(resolve(dist, "tanstack-form.mjs"), "utf8");
  const rhfTypes = readFileSync(resolve(dist, "react-hook-form.d.ts"), "utf8");
  const tanstackTypes = readFileSync(resolve(dist, "tanstack-form.d.ts"), "utf8");

  assert.match(rhfUiEntry, /@dual-autoform\/react\/react-hook-form/);
  assert.doesNotMatch(rhfUiEntry, /@dual-autoform\/react\/tanstack-form/);
  assert.match(tanstackUiEntry, /@dual-autoform\/react\/tanstack-form/);
  assert.doesNotMatch(tanstackUiEntry, /@dual-autoform\/react\/react-hook-form/);
  assert.match(rhfTypes, /<T extends Record<string, any>/);
  assert.match(tanstackTypes, /<T extends Record<string, any>/);
}

console.log("Package boundary checks passed for ESM and CommonJS.");
