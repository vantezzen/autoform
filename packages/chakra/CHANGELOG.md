# @dual-autoform/chakra

## 1.0.1

### Patch Changes

- Build package declarations into `dist` and point package exports at the published declaration files.
- Updated dependencies
  - @dual-autoform/react@1.0.1

## 4.0.0

### Major Changes

- Split React Hook Form and TanStack Form into explicit package subpaths while keeping shared React contracts at the package root.

  UI integrations now expose `/react-hook-form` and `/tanstack-form` convenience entries plus a root `createAutoForm` factory. The factory receives the selected adapter field hook explicitly, so shared UI fields stay internal to the UI package while users write custom fields with the selected form library hook.

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@7.0.0

## 3.0.0

### Major Changes

- refactor(breaking): rename `field` prop to `parsedField` in all wrapper components (`AutoFormFieldProps`, `FieldWrapperProps`, etc.) to prevent variable shadowing with `react-hook-form` controllers.

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@5.0.0

## 2.0.2

### Patch Changes

- refactor: bump UI packages following react package patch update

## 2.0.1

### Patch Changes

- docs: updated documentation links and cleaned up README files
- Updated dependencies
  - @dual-autoform/react@4.1.1

## 2.0.0

### Major Changes

- Rework dependency system

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@4.0.0

## 1.1.0

### Minor Changes

- Update

### Patch Changes

- Updated dependencies
  - @dual-autoform/core@2.2.0
  - @dual-autoform/react@3.1.0
  - @dual-autoform/zod@2.2.0
