# @dual-autoform/mui

## 5.0.0

### Major Changes

- Split React Hook Form and TanStack Form into explicit package subpaths while keeping shared React contracts at the package root.

  UI integrations now expose `/react-hook-form` and `/tanstack-form` convenience entries plus a root `createAutoForm` factory. The factory receives the selected adapter field hook explicitly, so shared UI fields stay internal to the UI package while users write custom fields with the selected form library hook.

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@7.0.0

## 4.0.0

### Major Changes

- refactor(breaking): rename `field` prop to `parsedField` in all wrapper components (`AutoFormFieldProps`, `FieldWrapperProps`, etc.) to prevent variable shadowing with `react-hook-form` controllers.

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@5.0.0

## 3.1.2

### Patch Changes

- refactor: bump UI packages following react package patch update

## 3.1.1

### Patch Changes

- docs: updated documentation links and cleaned up README files
- Updated dependencies
  - @dual-autoform/react@4.1.1

## 3.1.0

### Minor Changes

- Apply recent updates and registry migrations since namespace transition.

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@4.1.0

## 3.0.0

### Major Changes

- Rework dependency system

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@4.0.0

## 2.3.0

### Minor Changes

- Update

### Patch Changes

- Updated dependencies
  - @dual-autoform/core@2.2.0
  - @dual-autoform/react@3.1.0
  - @dual-autoform/zod@2.2.0

## 2.2.0

### Minor Changes

- df38752: Mark react and zod as peerDependencies, allow React 19 as a peer dependency

### Patch Changes

- Updated dependencies [df38752]
  - @dual-autoform/react@2.2.0
  - @dual-autoform/zod@2.1.0

## 2.1.0

### Minor Changes

- Add formProps

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@2.1.0

## 2.0.0

### Major Changes

- v2

### Patch Changes

- Updated dependencies
  - @dual-autoform/core@2.0.0
  - @dual-autoform/react@2.0.0
  - @dual-autoform/zod@2.0.0

## 1.2.0

### Minor Changes

- Improve DX

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@1.3.0
  - @dual-autoform/core@1.2.0
  - @dual-autoform/zod@1.2.0

## 1.1.3

### Patch Changes

- Add yup support
- Updated dependencies
  - @dual-autoform/core@1.1.3
  - @dual-autoform/react@1.2.1
  - @dual-autoform/zod@1.1.3

## 1.1.2

### Patch Changes

- Clean build package
- Updated dependencies [a93c30f]
- Updated dependencies
  - @dual-autoform/react@1.2.0
  - @dual-autoform/core@1.1.2
  - @dual-autoform/zod@1.1.2

## 1.1.1

### Patch Changes

- Fix build
- Updated dependencies
  - @dual-autoform/core@1.1.1
  - @dual-autoform/react@1.1.1
  - @dual-autoform/zod@1.1.1

## 1.1.0

### Minor Changes

- Initial release

### Patch Changes

- Updated dependencies
  - @dual-autoform/core@1.1.0
  - @dual-autoform/react@1.1.0
  - @dual-autoform/zod@1.1.0
