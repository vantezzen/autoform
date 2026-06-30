# React integration for AutoForm

This package provides shared React contracts plus the base React adapters for AutoForm.

Import shared renderer types and adapter-agnostic utilities from the package root. Runtime form implementations live in the `react-hook-form` and `tanstack-form` subpaths. Most applications should render AutoForm through a UI integration such as `@dual-autoform/mui/react-hook-form` or `@dual-autoform/mui/tanstack-form`.

## Installation

```bash
npm install @dual-autoform/react
```

```tsx
import type {
  AutoFormFieldProps,
  FieldWrapperProps,
  AutoFormUIComponents,
} from "@dual-autoform/react";
```

```tsx
import { AutoForm as RHFAutoForm } from "@dual-autoform/react/react-hook-form";
import { AutoForm as TanStackAutoForm } from "@dual-autoform/react/tanstack-form";
```

For more information on how to use this package, see the [AutoForm documentation](https://autoform-dual.vercel.app/docs/react/getting-started).
