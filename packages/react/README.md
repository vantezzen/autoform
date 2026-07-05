# React integration for AutoForm

This package provides shared React contracts plus the base React adapters for AutoForm.

Import shared renderer types and adapter-agnostic utilities from the package root. Runtime form implementations live in the `react-hook-form` and `tanstack-form` subpaths. Most applications should render AutoForm through a UI integration such as `@autoform/mui/react-hook-form` or `@autoform/mui/tanstack-form`.

## Installation

```bash
npm install @autoform/react
```

```tsx
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
  AutoFormUIComponents,
} from "@autoform/react";
```

```tsx
import { AutoForm as RHFAutoForm } from "@autoform/react/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@autoform/react/tanstack-form";
```

For more information on how to use this package, see the [AutoForm documentation](https://autoform.vantezzen.io/docs/react/getting-started).
