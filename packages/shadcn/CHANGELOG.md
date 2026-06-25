# @acp-autoform/shadcn

## 5.0.0

### Major Changes

- refactor(breaking): rename `field` prop to `parsedField` in all wrapper components (`AutoFormFieldProps`, `FieldWrapperProps`, etc.) to prevent variable shadowing with `react-hook-form` controllers.
- Choose the generated `react-hook-form` or `tanstack-form` entry explicitly. Generated field components bind directly to the selected adapter (`useController` for React Hook Form, `useFieldContext` for TanStack Form).

### Patch Changes

- Updated dependencies
  - @acp-autoform/react@5.0.0

## 4.1.1

### Patch Changes

- refactor: bump UI packages following react package patch update

## 4.1.0

### Minor Changes

- Apply recent updates and registry migrations since namespace transition.

### Patch Changes

- Updated dependencies
  - @acp-autoform/react@4.1.0

## 4.0.0

### Major Changes

- Rework dependency system

### Patch Changes

- Updated dependencies
  - @acp-autoform/react@4.0.0

## 3.1.0

### Minor Changes

- Update

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@2.2.0
  - @acp-autoform/react@3.1.0
  - @acp-autoform/zod@2.2.0

## 3.0.0

### Major Changes

- 422cec8: fix spreading keys warning for shadcn components

### Minor Changes

- df38752: Mark react and zod as peerDependencies, allow React 19 as a peer dependency

### Patch Changes

- Updated dependencies [df38752]
  - @acp-autoform/react@2.2.0
  - @acp-autoform/zod@2.1.0

## 2.1.0

### Minor Changes

- Add formProps

### Patch Changes

- Updated dependencies
  - @acp-autoform/react@2.1.0

## 2.0.0

### Major Changes

- v2

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@2.0.0
  - @acp-autoform/react@2.0.0
  - @acp-autoform/zod@2.0.0

## 1.1.0

### Minor Changes

- Improve DX

### Patch Changes

- Updated dependencies
  - @acp-autoform/react@1.3.0
  - @acp-autoform/core@1.2.0
  - @acp-autoform/zod@1.2.0

## 1.0.2

### Patch Changes

- Clean build package
- Updated dependencies [a93c30f]
- Updated dependencies
  - @acp-autoform/react@1.2.0
  - @acp-autoform/core@1.1.2
  - @acp-autoform/zod@1.1.2

## 1.0.1

### Patch Changes

- Fix build
- Updated dependencies
  - @acp-autoform/core@1.1.1
  - @acp-autoform/react@1.1.1
  - @acp-autoform/zod@1.1.1
