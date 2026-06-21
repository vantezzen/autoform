# @acp-autoform/react

## 7.0.0

### Major Changes

- Split React Hook Form and TanStack Form into explicit package subpaths while keeping shared React contracts and the adapter-agnostic `useField` hook at the package root.

  UI integrations now expose `/react-hook-form` and `/tanstack-form` convenience entries plus a root `createAutoForm` factory. Packages are ESM-first with `"type": "module"` while retaining explicit `.cjs`/`.d.cts` CommonJS exports. Both formats share one `AutoFormContext`, preserve generic schema inference, and install only the selected optional form-engine peer.

- Preserve user-owned options on external TanStack form controls. AutoForm owns `defaultValues` and `onSubmit`, while external `validationLogic`, validators, listeners, transforms, async settings, and `onSubmitInvalid` remain authoritative.

## 6.0.0

### Major Changes

- 9b94fca: Add per-field structural wrapper overrides for object, array, and array item fields.

  `fieldConfig` now supports `objectWrapper`, `arrayWrapper`, and `arrayElementWrapper` in addition to `fieldWrapper`. The React renderer prefers field-level wrappers over global `uiComponents`.

  The `FieldConfig` generic order now places `CustomData` before wrapper component generics.

### Patch Changes

- Updated dependencies [9b94fca]
  - @acp-autoform/core@4.0.0

## 5.0.0

### Major Changes

- refactor(breaking): rename `field` prop to `parsedField` in all wrapper components (`AutoFormFieldProps`, `FieldWrapperProps`, etc.) to prevent variable shadowing with `react-hook-form` controllers.

## 4.1.2

### Patch Changes

- refactor: patch refactor

## 4.1.1

### Patch Changes

- docs: updated documentation links and cleaned up README files
- Updated dependencies
  - @acp-autoform/core@3.1.1

## 4.1.0

### Minor Changes

- Apply recent updates and registry migrations since namespace transition.

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@3.1.0

## 4.0.0

### Major Changes

- Rework dependency system

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@3.0.0

## 3.1.0

### Minor Changes

- Update

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@2.2.0
  - @acp-autoform/yup@2.2.0
  - @acp-autoform/zod@2.2.0

## 3.0.0

### Major Changes

- b10ea83: add ant-design support

## 2.2.0

### Minor Changes

- df38752: Mark react and zod as peerDependencies, allow React 19 as a peer dependency

### Patch Changes

- Updated dependencies [df38752]
  - @acp-autoform/yup@2.1.0
  - @acp-autoform/zod@2.1.0

## 2.1.0

### Minor Changes

- Add formProps

## 2.0.0

### Major Changes

- v2

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@2.0.0
  - @acp-autoform/yup@2.0.0
  - @acp-autoform/zod@2.0.0

## 1.3.0

### Minor Changes

- Improve DX

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@1.2.0
  - @acp-autoform/zod@1.2.0

## 1.2.1

### Patch Changes

- Add yup support
- Updated dependencies
  - @acp-autoform/core@1.1.3
  - @acp-autoform/zod@1.1.3

## 1.2.0

### Minor Changes

- a93c30f: Add clearForm to onSubmit

### Patch Changes

- Clean build package
- Updated dependencies
  - @acp-autoform/core@1.1.2
  - @acp-autoform/zod@1.1.2

## 1.1.1

### Patch Changes

- Fix build
- Updated dependencies
  - @acp-autoform/core@1.1.1
  - @acp-autoform/zod@1.1.1

## 1.1.0

### Minor Changes

- Initial release

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@1.1.0
  - @acp-autoform/zod@1.1.0
