# @dual-autoform/ant

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

## 2.1.2

### Patch Changes

- refactor: bump UI packages following react package patch update

## 2.1.1

### Patch Changes

- docs: updated documentation links and cleaned up README files
- Updated dependencies
  - @dual-autoform/react@4.1.1

## 2.1.0

### Minor Changes

- Apply recent updates and registry migrations since namespace transition.

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@4.1.0

## 2.0.0

### Major Changes

- Rework dependency system

### Patch Changes

- Updated dependencies
  - @dual-autoform/react@4.0.0

## 1.3.0

### Minor Changes

- Update

### Patch Changes

- Updated dependencies
  - @dual-autoform/core@2.2.0
  - @dual-autoform/react@3.1.0
  - @dual-autoform/zod@2.2.0

## 1.2.0

### Minor Changes

- 1db1baa: ### What the change is
  - **Component:** Simplified logic, removed unnecessary context, and fixed date component bugs.
  - **React Integration:** Restored structure while keeping improvements; updated `AutoFormProps` to allow custom attributes.
  - **Testing:** Added Cypress tests (`ant-zod`) for validation.

  ### Why the change was made
  - These changes refine implementation and fix existing issues.

## 1.1.0

### Minor Changes

- 65e161a: improve ant package implementation, fix bugs.

## 1.0.0

### Major Changes

- b10ea83: add ant-design support

### Patch Changes

- Updated dependencies [b10ea83]
  - @dual-autoform/react@3.0.0
